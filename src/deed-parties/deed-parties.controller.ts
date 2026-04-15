/* eslint-disable prettier/prettier */
import { Controller} from '@nestjs/common';
import { DeedPartiesService } from './deed-parties.service';
// import { CreateDeedPartyDto } from './dto/create-deed-party.dto';
// import { UpdateDeedPartyDto } from './dto/update-deed-party.dto';

@Controller('deed-parties')
export class DeedPartiesController {
  constructor(private readonly deedPartiesService: DeedPartiesService) {}

  // @Post()
  // create(@Body() createDeedPartyDto: CreateDeedPartyDto) {
  //   return this.deedPartiesService.create(createDeedPartyDto);
  // }

  // @Get()
  // findAll() {
  //   return this.deedPartiesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.deedPartiesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDeedPartyDto: UpdateDeedPartyDto) {
  //   return this.deedPartiesService.update(+id, updateDeedPartyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.deedPartiesService.remove(+id);
  // }
}
