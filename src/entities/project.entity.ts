import { ProjectDto } from "src/dtos/project.dto";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entity";
import { ProjectTask } from "./projectTask.entity";

export enum ProjectStatus {
    LEAD = "Lead",
    QUOTED = "Quoted",
    INVOICED = "Invoiced",
    PAYED = "Paid",
}

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({type: "int"})
    public clientProjectId: number;

    @CreateDateColumn()
    public createdOn: Date;

    @UpdateDateColumn()
    public lastUpdate: Date;

    @DeleteDateColumn()
    public deletedOn: Date;

    @Column()
    public name: string;

    @Column({type: "mediumtext"})
    public description: string;

    @Column({type: "enum", enum: ProjectStatus})
    public status: ProjectStatus;

    @ManyToOne(type => Client, {eager: true})
    public client: Client;

    @OneToMany(type => ProjectTask, task => task.project, {eager: true})
    public tasks: ProjectTask[];

    public async updateFromDTO(req: ProjectDto, client: Client = null) {
        this.name = req.name;
        this.description = req.description;
        this.status = req.status;
        if (client) this.client = client;
        await this.save();
        return this;
    }

    public static async FromDTO(client: Client, req: ProjectDto) {
        const project = new Project();
        project.clientProjectId = await Project.count({
            where: {
                client,
            }
        });
        await project.updateFromDTO(req, client);
        return project;
    }
}