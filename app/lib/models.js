import { Schema, models, model } from "mongoose";
import { randomUUID } from "crypto";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      min: 3,
      max: 20,
    },
    lastname: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    roles: [
      {
        type: String,
        enum: [
          "administrator",
          "hunter",
          "clinician",
          "auditor",
          "guest",
          "researcher",
        ],
      },
    ],
  },
  { timestamps: true }
);

const kitSchema = new Schema({
  hunter: {
    type: Schema.Types.ObjectId,
  },
  event: {
    type: String,
  },
  status: {
    type: String,
    enum: ["created", "shipped", "registered", "returned", "destroyed"],
  },
  processes: [
    {
      name: {
        type: String,
        enum: ["created", "shipped", "registered", "returned", "destroyed"],
      },
      date: { type: Date },
      user: { type: String },
      notes: { type: String },
    },
  ],
  samples: [Schema.Types.ObjectId],
});

const sampleSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "freshwater",
        "seawater",
        "soil",
        "wastewater",
        "pooled_wastewater",
      ],
      required: true,
    },
    assigned_label: { type: String, required: true },

    isCitizenSample: { type: Boolean, default: true },

    w3w: {
      type: String,
    },
    kit: {
      type: Schema.Types.ObjectId,
    },

    date_taken: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
    },
    img: {
      type: String,
      immutable: true,
    },
    status: {
      type: String,
      enum: ["registered", "filtered", "stored", "destroyed", "returned"],
      default: "registered",
      required: true,
    },

    processes: [
      {
        name: {
          type: String,
          enum: ["received", "filtered", "centrifuged", "stored", "destroyed"],
        },
        date: { type: Date, required: true, immutable: true },
        user: { type: String, required: true, immutable: true },
        method_uri: { type: String, required: true, immutable: true },
        notes: { type: String },
        files: [
          {
            uri: { type: String, immutable: true },
            description: { type: String },
          },
        ],
      },
    ],
    phage_hunts: [
      {
        performed_by: { type: String, required: true },
        host: { type: String, required: true },
        date: { type: Date, required: true },
        method_uri: { type: String, immutable: true },
        notes: String,
        phages_found: [{ type: Schema.Types.ObjectId }],
      },
    ],
  },
  { timestamps: true }
);

const hostSchema = new Schema(
  {
    short_name: { type: String, required: true, minLength: 5, maxLength: 12 },
    genus: { type: String, required: true },
    species: { type: String, required: true },
    strain: { type: String, required: true },

    source: {
      reason: { type: String, required: true },
      institution: { type: String, required: true },
      contact_email: { type: String, required: true },
      mta: {
        signed: { type: Boolean, default: false },
        uri: { type: String, immutable: true },
        end_date: Date,
      },
    },
    reference_genome: {
      uri: { type: String, immutable: true },
      format: { type: String, enum: ["genbank", "fasta", "external_url"] },
    },

    preferred_growth_conditions: {
      temperature: { type: Number, min: 0, max: 50 },
      medium: { type: String },
      doubling_time: { type: Number, min: 0 },
      carrying_capacity: { type: Number, min: 0 },
    },
    processes: {
      received: {
        date: {
          type: Date,
        },
        by: {
          type: String,
        },
      },
      stored: [
        {
          format: { type: String },
          date: { type: Date },
          by: { type: String },
          type: { type: String, enum: ["master stock", "working stock"] },
          location: {
            temperature: { type: Number, min: -80, max: 10 },
            date: { type: Date },
            fridge_freezer_name: { type: String },
            box_number: { type: String },
            position: { type: String, minLength: 2 },
          },
          destroyed: {
            date: { type: Date },
            by: { type: String },
            reason: { type: String },
          },
        },
      ],
      dna_extraction: [
        {
          date: { type: Date },
          by: { type: String },
          reason: { type: String },
          method: { type: String },
          method_uri: { type: String, immutable: true },
          final_concentration: { type: Number },
          final_elution_volume: { type: Number },
          storage: {
            format: { type: String },
            location: {
              temperature: { type: Number, min: -80, max: 10 },
              date: { type: Date, required: true },
              fridge_freezer_name: { type: String },
              box_number: { type: String },
              position: { type: String, minLength: 2 },
            },
            other: { type: String, minLength: 5 },
            isActive: { type: Boolean },
          },
        },
      ],
      sequencing: [
        {
          source_dna: Schema.Types.ObjectId,
          date_sequenced: { type: Date },
          sequencing_center: { type: String },
          sequencing_type: { type: String },
          number_of_reads: { type: Number, min: 0 },
          total_bp: { type: Number, min: 0 },
          reads: {
            read_url: { type: String, immutable: true },
            read_qc_url: String,
            visibility: {
              type: String,
              enum: ["all", "internal", "controlled"],
              default: "internal",
            },
          },
        },
      ],
      assembly: [
        {
          date: { type: Date },
          by: { type: String },
          reason: { type: String },
          assembler: { type: String },
          assembler_version: { type: String },
          command: { type: String },
          contigs_file: { type: String, immutable: true },
          assembly_graph: { type: String, immutable: true },
          contigs: [
            {
              old_name: String,
              new_name: String,
              length: Number,
            },
          ],
        },
      ],
      shipped: [
        {
          date: { type: Date },
          by: { type: String },
          reason: { type: String },
          notes: [String],
          files: [
            {
              uri: { type: String, immutable: true },
              description: { type: String },
              type: { type: String },
            },
          ],
        },
      ],
      propagated: [
        {
          storage_id: Schema.Types.ObjectId,
          date: { type: Date },
          by: { type: String },
          reason: { type: String },
          notes: [String],
          files: [
            {
              uri: { type: String, immutable: true },
              description: { type: String },
              type: { type: String },
            },
          ],
        },
      ],
    },
    infecting_phages: [Schema.Types.ObjectId],
    notes: [String],
  },
  { timestamps: true }
);

const phageSchema = new Schema(
  {
    UUID: { type: "UUID", required: true, default: () => randomUUID() },
    version: { type: String, required: true, immutable: true },
    name: {
      full_name: { type: String, required: true },
      short_name: { type: String, required: true },
    },
    visibility: {
      type: String,
      required: true,
      enum: ["all", "internal", "controlled"],
      default: "internal",
    },
    status: {
      type: String,
      enum: ["isolated", "purified", "sequenced"],
      required: true,
    },
    processes: [
      {
        process_id: Schema.Types.ObjectId,
        name: {
          type: String,
          enum: [
            "isolation",
            "purification",
            "sequencing",
            "host_range",
            "receptor_identification",
            "other",
          ],
          required: true,
        },
        date: { type: Date, required: true },
        user: { type: String, required: true },
        description: String,
        method_uri: String,
        notes: { type: String },
        files: [
          {
            uri: { type: String, immutable: true },
            description: { type: String },
          },
        ],
      },
    ],

    source: {
      isolation_host: {
        name: String,
        genbank_url: String,
        isolated_by: String,
        isolated_from: String,
      },
      provided_by: String,
    },
    sequencing: {
      propagation: {
        propagation_host: {
          name: String,
          genbank_url: String,
        },
        method_uri: String,
        actor: { type: String, required: true },
        date: Date,
        notes: [String],
      },
      dna_extraction: {
        method_uri: String,
        actor: { type: String, required: true },
        date: Date,
        notes: [String],
      },
      date_sequenced: { type: Date, required: true },
      sequencing_center: { type: String, required: true },
      sequencing_type: { type: String, required: true },
      dna_extraction_method: String,
      number_of_reads: { type: Number, required: true, min: 0 },
      total_bp: { type: Number, required: true, min: 0 },
      reads: {
        read_url: { type: String, immutable: true },
        read_qc_url: String,
        visibility: {
          type: String,
          required: true,
          enum: ["all", "internal", "controlled"],
          default: "internal",
        },
      },
      host_removal: {
        host_genome: String,
        genome_url: String,
        mapping: {
          total_mapped_count: { type: Number, required: true, min: 0 },
          total_unmapped_count: { type: Number, required: true, min: 0 },
          total_mapped_bp: { type: Number, required: true, min: 0 },
          total_unmapped_bp: { type: Number, required: true, min: 0 },
          pct_mapped_count: { type: Number, required: true, min: 0 },
          pct_mapped_bp: { type: Number, required: true, min: 0 },
          mapped_reads_bam: String,
        },
      },
    },
    assemblies: [
      {
        assembler: { type: String, required: true },
        assembler_version: { type: String, required: true },
        command: { type: String, required: true },
        subsampled_coverage: Number,
        contigs_file: { type: String, immutable: true },
        assembly_graph: String,
        contigs: [
          {
            old_name: String,
            new_name: String,
            length: Number,
          },
        ],
      },
    ],
    purity: {
      total_mapped_count: { type: Number, required: true, min: 0 },
      total_unmapped_count: { type: Number, required: true, min: 0 },
      total_mapped_bp: { type: Number, required: true, min: 0 },
      total_unmapped_bp: { type: Number, required: true, min: 0 },
      pct_mapped_count: { type: Number, required: true, min: 0 },
      pct_mapped_bp: { type: Number, required: true, min: 0 },
    },
    viral_contigs: {
      selected_contig_name: { type: String, required: true },
      selected_contig_length: { type: Number, required: true },
      checkv: {
        version: { type: String, required: true },
        command: { type: String, required: true },
        contigs: [
          {
            name: { type: String, required: true },
            quality: { type: String, required: true },
            estimated_completeness: { type: Number, required: true },
          },
        ],
      },
      gene_calling: {
        program_used: { type: String, required: true },
        program_version: { type: String, required: true },
        command: { type: String, required: true },
        genbank_url: { type: String, immutable: true },
        plot_url: { type: String, immutable: true },
      },
      lifestyle: {
        predicted_lifestyle: String,
        prediction_methods: [
          {
            program_name: { type: String, required: true },
            program_version: { type: String, required: true },
            command: { type: String, required: true },
            result: String,
          },
        ],
      },
      genes_of_concern: {
        predicted_genes_of_concern: [String],
        prediction_methods: [
          {
            method: { type: String, required: true },
            command: { type: String, required: true },
          },
        ],
      },
      genome_coverage: {
        assembly_average_coverage: Number,
        assembly_bam_file: { type: String, immutable: true },
        assembly_coverage_plot_file: { type: String, immutable: true },
      },
      variants: {
        program_name: String,
        program_version: String,
        command: String,
        full_read_bam_file: { type: String, immutable: true },
      },
      phylogeny: {
        estimated_distance: Number,
        estimated_distance_method: String,
        database_name: { type: String, immutable: true },
        database_version: { type: String, immutable: true },
        closest_hit: {
          name: String,
          accession_number: String,
          taxonomy: String,
        },
      },
    },
    receptors: [String],
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
export const Kit = models.Kit || model("Kit", kitSchema);
export const Sample = models.Sample || model("Sample", sampleSchema);
export const Host = models.Host || model("Host", hostSchema);
export const Phage = models.Phage || model("Phage", phageSchema);
