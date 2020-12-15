import { Param, Post } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { ProjectDto } from "src/dtos/project.dto";
import { Client } from "src/entities/client.entity";
import { Project } from "src/entities/project.entity";

@Controller("v1/project")
export class ProjectController {

    @Get()
    public async getProjects(@Param("id") id: string, @Body() req: ProjectDto) {
        const client = await Client.findOneOrFail(req.clientId);
        return await Project.FromDTO(client, req);

    }

    @Get(":id")
    public async getProject(@Param("id") id: string) {
        return await Project.findOneOrFail(id);
    }

    @Post()
    public async createProject(@Body() req: ProjectDto) {
        return await Project.FromDTO(await Client.findOneOrFail(req.clientId), req);
    }
}