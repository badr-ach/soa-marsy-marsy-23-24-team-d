import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SiteExistsException } from '../exceptions/site-exists.exception';
import { Site } from '../schema/site.schema';


@Injectable()
export class SiteService {
  constructor(@InjectModel(Site.name) private siteModel: Model<Site>) {}

  async getAllSites(): Promise<Site[]> {
    const sites = await this.siteModel.find().exec();
    return sites;
  }

  //find site by id
  async getSiteById(id: string): Promise<Site> {
    const site = await this.siteModel.findById(id).exec();
    return site;
  }

  async createSite(name: string, latitude: number, longitude: number, altitude: number): Promise<Site> {
    const existingSite = await this.siteModel.findOne({ name }).exec();
  
    if (existingSite) {
      throw new SiteExistsException(name);
    }
  
    const newSite = new this.siteModel({
      name,
      latitude,
      longitude,
      altitude,
    });

    return newSite.save();
  }

}