import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import {getConnection} from "typeorm";
import { ClientController } from './controllers/client.controller';
import { ProjectController } from './controllers/project.controller';
import { ProjectTaskController } from './controllers/projectTask.controller';
import { PDFModule } from '@t00nday/nestjs-pdf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    PDFModule.register({
      view: {
        root: process.cwd() + '/templates',
        engine: 'handlebars',
      }
    })
  ],
  controllers: [
    AppController,
    ClientController,
    ProjectController,
    ProjectTaskController,
  ],
  providers: [AppService],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
      await this.setEntityConnections();
  }

  async setEntityConnections() {
      const connection = await getConnection();
      connection.entityMetadatas.forEach(entity => {
          (entity.target as any).useConnection(connection);
      })
  }
}