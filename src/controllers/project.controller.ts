import { Delete, Param, Post, Put } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { ProjectDto } from "src/dtos/project.dto";
import { Client } from "src/entities/client.entity";
import { Project } from "src/entities/project.entity";
import { ProjectTask } from "src/entities/projectTask.entity";

@Controller("v1/projects")
export class ProjectController {

    @Get()
    public async getProjects(@Param("id") id: string) {
        return await Project.find();
    }

    @Get(":id")
    public async getProject(@Param("id") id: string) {
        return await Project.findOneOrFail(id);
    }

    @Post()
    public async createProject(@Body() req: ProjectDto) {
        return await Project.FromDTO(await Client.findOneOrFail(req.clientId), req);
    }

    @Put(":id")
    public async updateProject(@Param("id") id: string, @Body() req: ProjectDto) {
        return await (await Project.findOneOrFail(id)).updateFromDTO(req);
    }

    @Delete(":id")
    public async deleteProject(@Param("id") id: string) {
        (await Project.findOneOrFail(id)).remove();
        return void 0;
    }

    @Get(":id/tasks")
    public async getTasks(@Param("id") id: string) {
        return await ProjectTask.find({
            where: {
                project: {
                    id,
                }
            }
        })
    }

}