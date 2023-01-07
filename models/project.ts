import * as borsh from '@project-serum/borsh'

export class project {
    projectName: string;
    projectDetail: string;
    description: string;

    constructor(projectName: string, projectDetail: string, description: string) {
        this.projectName = projectName;
        this.projectDetail = projectDetail;
        this.description = description;
    }

    static mocks: project[] = []

    borshInstructionSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('projectName'),
        borsh.str('projectDetail'),
        borsh.str('description'),
    ])

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000)
        this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer)
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer))
    }
}