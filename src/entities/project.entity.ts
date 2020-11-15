import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProjectTask } from "./projectTask.entity";

enum ProjectStatus {
    LEAD = "Lead",
    QUOTED = "Quoted",
    INVOICED = "Invoiced",
    PAYED = "Paid",
}

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdOn: Date;

    @UpdateDateColumn()
    public lastUpdate: Date;

    @DeleteDateColumn()
    public deletedOn: Date;

    @Column({type: "enum", enum: ProjectStatus})
    public status: ProjectStatus;

    @OneToMany(type => ProjectTask, task => task.project)
    public tasks: ProjectTask[];
}