import { ProjectTaskDto } from "src/dtos/projectTask.dto";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class ProjectTask extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ManyToOne(type => Project, project => project.tasks)
    public project: Project;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column({type: "bool", default: false})
    public complete: boolean;

    @Column({type: "float"})
    public estimatedHours: number;

    @Column({type: "float", default: 0})
    public actualHours: number;

    public async updateFromReq(req: ProjectTaskDto) {
        this.name = req.name;
        this.description = req.description;
        this.complete = req.complete;
        this.estimatedHours = req.estimatedHours;
        this.actualHours = req.actualHours;
        await this.save();
        return this;
    }

    public static async FromDTO(project: Project, req: ProjectTaskDto) {
        const task = new ProjectTask();
        task.project = project;
        return await task.updateFromReq(req);
    }

}