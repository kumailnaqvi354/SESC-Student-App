import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Library } from './entities/library.entity';
import { LibrarySchema } from './schema/library.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Library.name, schema: LibrarySchema }]),
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
