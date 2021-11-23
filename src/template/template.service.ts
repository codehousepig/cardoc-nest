import { Injectable } from '@nestjs/common';
import { FrontTireService } from '../front-tire/front-tire.service';
import { BaseInfoService } from '../baseinfo/baseinfo.service';
import { RearTireService } from '../rear-tire/rear-tire.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TemplateService {
  constructor(
    private readonly frontTireService: FrontTireService,
    private readonly rearTireService: RearTireService,
    private readonly baseInfoService: BaseInfoService,
  ) {}

  async myTire(user: User) {
    const mytire = {
      frontTire: (await this.frontTireToTrim(user.trimId)) || '',
      rearTire: (await this.rearTireToTrim(user.trimId)) || '',
    };
    return mytire;
  }

  // driving -> (3/11) frontTire
  async frontTireToTrim(id: number) {
    const rawTire = await this.frontTireService.findOne(id);
    const resultTire = {
      name: rawTire.name,
      value: `${rawTire.width}/${rawTire.ratio}R${rawTire.wheel}`,
      unit: rawTire.unit || '',
      multiValues: rawTire.multiValues || '',
    };
    return resultTire;
  }

  // driving -> (9/11) rearTire
  async rearTireToTrim(id: number) {
    const rawTire = await this.rearTireService.findOne(id);
    const resultTire = {
      name: rawTire.name,
      value: `${rawTire.width}/${rawTire.ratio}R${rawTire.wheel}`,
      unit: rawTire.unit || '',
      multiValues: rawTire.multiValues || '',
    };
    return resultTire;
  }

  // spec -> (5/5) driving
  async drivingToTrim(id: number) {
    const resultDriving = {
      name: '',
      type: '',
      frontTire: (await this.frontTireToTrim(id)) || '',
      steering: '',
      frontBreak: '',
      rearBreak: '',
      frontSuspension: '',
      rearSuspension: '',
      rearTire: (await this.rearTireToTrim(id)) || '',
      gearRatio: '',
      powerSteering: '',
    };
    return resultDriving;
  }

  // trim(baseinfo) -> (36/36) spec
  async specToTrim(id: number) {
    const resultSpec = {
      imageUrl: '',
      fuel: '',
      dimension: '',
      engine: '',
      driving: (await this.drivingToTrim(id)) || '',
    };
    return resultSpec;
  }

  async trimToView(id: number) {
    const rawBaseInfo = await this.baseInfoService.findOne(id);
    const result = {
      brandId: rawBaseInfo.brandId || '',
      brandName: rawBaseInfo.brandName || '',
      brandNameEng: '',
      country: '',
      isImported: '',
      brandImageUrl: '',
      brandUrl: '',
      modelId: '',
      modelName: rawBaseInfo.modelName || '',
      submodelGroupId: '',
      submodelGroupYearTypeFrom: '',
      submodelGroupYearTypeTo: '',
      submodelGroupName: '',
      submodelId: '',
      submodelName: '',
      submodelNameEng: '',
      yearType: '',
      availableYearTypes: '',
      submodelImageUrl: '',
      gradeId: '',
      gradeName: '',
      fuelType: '',
      displacement: '',
      trimId: rawBaseInfo.trimId || '',
      trimName: rawBaseInfo.trimName || '',
      salesCode: '',
      bodySize: '',
      bodyStyle: '',
      transmission: '',
      price: '',
      priceUnit: '',
      isRecommended: '',
      releaseDate: '',
      discontinuedDate: '',
      carTypeCode: '',
      spec: (await this.specToTrim(id)) || '',
    };
    return result;
  }
}
