import { Injectable } from '@nestjs/common';
import { FrontTireService } from '../front-tire/front-tire.service';
import { BaseInfoService } from '../baseinfo/baseinfo.service';

@Injectable()
export class TemplateService {
  constructor(
    private readonly frontTireService: FrontTireService,
    private readonly baseInfoService: BaseInfoService,
  ) {}

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

  async drivingToTrim(id: number) {
    const resultDriving = {
      name: '',
      type: '',
      frontTire: await this.frontTireToTrim(id),
      steering: '',
      frontBreak: '',
      rearBreak: '',
      frontSuspension: '',
      rearSuspension: '',
      rearTire: '',
      gearRatio: '',
      powerSteering: '',
    };
    return resultDriving;
  }

  async specToTrim(id: number) {
    const resultSpec = {
      imageUrl: '',
      fuel: '',
      dimension: '',
      engine: '',
      driving: await this.drivingToTrim(id),
    };
    return resultSpec;
  }

  async trimToView(id: number) {
    const rawBaseInfo = await this.baseInfoService.findOne(id);
    const result = {
      brandId: rawBaseInfo.brandId,
      brandName: rawBaseInfo.brandName,
      brandNameEng: '',
      country: '',
      isImported: '',
      brandImageUrl: '',
      brandUrl: '',
      modelId: '',
      modelName: rawBaseInfo.modelName,
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
      trimId: rawBaseInfo.trimId,
      trimName: rawBaseInfo.trimName,
      salesCode: '',
      bodySize: '',
      bodyStyle: '',
      transmission: '',
      price: '',
      priceUnit: '',
      isRecommended: '',
      carTypeCode: '',
      spec: await this.specToTrim(id),
    };
    return result;
  }
}
