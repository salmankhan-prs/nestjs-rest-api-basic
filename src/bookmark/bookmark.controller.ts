import { Controller, Post, UseGuards, Body, Get, Param, ParseIntPipe } from '@nestjs/common'
import { GetUser } from '../auth/decarators';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { createBookmarkDto } from './dto/createbookmark.dto';
import { BookmarkService } from './bookmark.service';
@Controller('book')
@UseGuards(JwtGuard)
export class BookmarkController {
    constructor(private bookmark: BookmarkService) { }
    @Post()
    async createBookmark(@GetUser('id') id: number, @Body() createBookmark: createBookmarkDto) {
        return this.bookmark.creteBookmark(id, createBookmark)
    }
    @Get()
    async getAllBookmark(@GetUser('id') id: number) {
        return this.bookmark.getAllBookmarks(id)
    }
    @Get('/:bookmarkId')
    async getBookmarkById(@GetUser('id') id: number, @Param('bookmarkId', ParseIntPipe) bookmarkId: number) {
        return this.bookmark.getBookmarksByid(id, bookmarkId)
    }

}