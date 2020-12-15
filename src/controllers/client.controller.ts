import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClientDto } from "src/dtos/client.dto";
import { ProjectDto } from "src/dtos/project.dto";
import { Client } from "src/entities/client.entity";
import { Project } from "src/entities/project.entity";

@Controller("v1/client")
export class ClientController {
    @Get()
    public async getClients() {
        return await Client.find();
    }

    @Post()
    public async createClient(@Body() req: ClientDto) {
        return await Client.FromDTO(req);
    }

    @Get(":id")
    public async getClient(@Param("id") id: string) {
        return await Client.findOneOrFail(id);
    }

    @Put(":id")
    public async updateClient(@Param("id") id: string, @Body() req: ClientDto) {
        return await (await Client.findOneOrFail(id)).updateFromDTO(req);
    }

    @Delete(":id")
    public async deleteClient(@Param("id") id: string) {
        (await Client.findOneOrFail(id)).remove();
        return void 0;
    }

    @Get(":id/projects")
    public async getProjects(@Param("id") id: string) {
        return await Project.find({
            where: {
                client: {
                    id,
                }
            }
        })
    }
}