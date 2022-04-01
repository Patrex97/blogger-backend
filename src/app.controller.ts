import { Controller, Get, Res, Param } from '@nestjs/common';
import { createReadStream } from 'fs';
import { storageDir } from './utils/storage';
import { Response } from 'express';
import * as path from 'path';

@Controller('/')
export class AppController {
  @Get('/file/:fileName')
  getFile(@Res() res: Response, @Param('fileName') fileName: string) {
    const file = createReadStream(path.join(storageDir(), 'photos', fileName));
    file.pipe(res);
  }
}
