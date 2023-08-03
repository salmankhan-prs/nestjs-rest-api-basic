import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createBookmarkDto } from './dto/createbookmark.dto';

@Injectable()
export class BookmarkService {

    constructor(private prisma: PrismaService) { }
    async creteBookmark(id: number, createBookmark: createBookmarkDto) {
        return this.prisma.bookmark.create({ data: { ...createBookmark, userId: id } })
    }

    async getAllBookmarks(id: number) {
        return this.prisma.bookmark.findMany({ where: { userId: id } })
    }
    async getBookmarksByid(id: number, boomarkId: number) {
        return this.prisma.bookmark.findFirst({ where: { userId: id, id: boomarkId } })
    }
}
