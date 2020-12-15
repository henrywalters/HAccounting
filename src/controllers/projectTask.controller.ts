import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProjectTaskDto } from "src/dtos/projectTask.dto";
import { Project } from "src/entities/project.entity";
import { ProjectTask } from "src/entities/projectTask.entity";

@Controller("v1/project-task")
export class ProjectTaskController {
    @Get()
    public async getTasks() {
        return await ProjectTask.find();
    }

    @Get(":id")
    public async getTask(@Param("id") id: string) {
        return await ProjectTask.findOneOrFail(id);
    }

    @Post()
    public async createTask(@Body() req: ProjectTaskDto) {
        return await ProjectTask.FromDTO(await Project.findOneOrFail(req.projectId), req);
    }

    @Put(":id")
    public async updateTask(@Param("id") id: string, @Body() req: ProjectTaskDto) {
        return await (await ProjectTask.findOneOrFail(id)).updateFromReq(req);
    }

    @Delete(":id")
    public async deleteTask(@Param("id") id: string) {
        (await ProjectTask.findOneOrFail(id)).remove();
        return void 0;
    }
}