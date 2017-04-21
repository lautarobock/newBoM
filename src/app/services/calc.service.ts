import { Fermentable, FermentableType, Hop, HopForm, HopUse } from '../domain/recipe';
import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class CalcService {

  private static readonly SRM = ['#FFFFFF', 'FFE699', '#FFD878', '#FFCA5A', '#FFBF42', '#FBB123', '#F8A600', '#F39C00', '#EA8F00', '#E58500', '#DE7C00',
    '#D77200', '#CF6900', '#CB6200', '#C35900', '#BB5100', '#B54C00', '#B04500', '#A63E00', '#A13700', '#9B3200',
    '#952D00', '#8E2900', '#882300', '#821E00', '#7B1A00', '#771900', '#701400', '#6A0E00', '#660D00', '#5E0B00',
    '#5A0A02', '#600903', '#520907', '#4C0505', '#470606', '#440607', '#3F0708', '#3B0607', '#3A070B', '#36080A'];
  private static readonly U_gravity = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
  private static readonly U = {
    '0': {
      '30': 0,
      '40': 0,
      '50': 0,
      '60': 0,
      '70': 0,
      '80': 0,
      '90': 0,
      '100': 0,
      '110': 0,
      '120': 0
    },
    '5': {
      '30': 0.055,
      '40': 0.050,
      '50': 0.046,
      '60': 0.042,
      '70': 0.038,
      '80': 0.035,
      '90': 0.032,
      '100': 0.029,
      '110': 0.027,
      '120': 0.025
    },
    '10': {
      '30': 0.100,
      '40': 0.091,
      '50': 0.084,
      '60': 0.076,
      '70': 0.070,
      '80': 0.064,
      '90': 0.058,
      '100': 0.053,
      '110': 0.049,
      '120': 0.045
    },
    '15': {
      '30': 0.137,
      '40': 0.125,
      '50': 0.114,
      '60': 0.105,
      '70': 0.096,
      '80': 0.087,
      '90': 0.080,
      '100': 0.073,
      '110': 0.067,
      '120': 0.061
    },
    '20': {
      '30': 0.167,
      '40': 0.153,
      '50': 0.140,
      '60': 0.128,
      '70': 0.117,
      '80': 0.107,
      '90': 0.098,
      '100': 0.089,
      '110': 0.081,
      '120': 0.074
    },
    '25': {
      '30': 0.192,
      '40': 0.175,
      '50': 0.160,
      '60': 0.147,
      '70': 0.134,
      '80': 0.122,
      '90': 0.112,
      '100': 0.102,
      '110': 0.094,
      '120': 0.085
    },
    '30': {
      '30': 0.212,
      '40': 0.194,
      '50': 0.177,
      '60': 0.162,
      '70': 0.148,
      '80': 0.135,
      '90': 0.124,
      '100': 0.113,
      '110': 0.103,
      '120': 0.094
    },
    '35': {
      '30': 0.229,
      '40': 0.209,
      '50': 0.191,
      '60': 0.175,
      '70': 0.160,
      '80': 0.146,
      '90': 0.133,
      '100': 0.122,
      '110': 0.111,
      '120': 0.102
    },
    '40': {
      '30': 0.242,
      '40': 0.221,
      '50': 0.202,
      '60': 0.185,
      '70': 0.169,
      '80': 0.155,
      '90': 0.141,
      '100': 0.129,
      '110': 0.118,
      '120': 0.108
    },
    '45': {
      '30': 0.253,
      '40': 0.232,
      '50': 0.212,
      '60': 0.194,
      '70': 0.177,
      '80': 0.162,
      '90': 0.148,
      '100': 0.135,
      '110': 0.123,
      '120': 0.113
    },
    '50': {
      '30': 0.263,
      '40': 0.240,
      '50': 0.219,
      '60': 0.200,
      '70': 0.183,
      '80': 0.168,
      '90': 0.153,
      '100': 0.140,
      '110': 0.128,
      '120': 0.117
    },
    '55': {
      '30': 0.270,
      '40': 0.247,
      '50': 0.226,
      '60': 0.206,
      '70': 0.188,
      '80': 0.172,
      '90': 0.157,
      '100': 0.144,
      '110': 0.132,
      '120': 0.120
    },
    '60': {
      '30': 0.276,
      '40': 0.252,
      '50': 0.231,
      '60': 0.211,
      '70': 0.193,
      '80': 0.176,
      '90': 0.161,
      '100': 0.147,
      '110': 0.135,
      '120': 0.123
    },
    '65': {
      '30': 0.28049999999999997,
      '40': 0.2565,
      '50': 0.2345,
      '60': 0.2145,
      '70': 0.196,
      '80': 0.179,
      '90': 0.1635,
      '100': 0.1495,
      '110': 0.137,
      '120': 0.125
    },
    '70': {
      '30': 0.285,
      '40': 0.261,
      '50': 0.238,
      '60': 0.218,
      '70': 0.199,
      '80': 0.182,
      '90': 0.166,
      '100': 0.152,
      '110': 0.139,
      '120': 0.127
    },
    '75': {
      '30': 0.288,
      '40': 0.2635,
      '50': 0.2405,
      '60': 0.22,
      '70': 0.201,
      '80': 0.184,
      '90': 0.168,
      '100': 0.1535,
      '110': 0.1405,
      '120': 0.1285
    },
    '80': {
      '30': 0.291,
      '40': 0.266,
      '50': 0.243,
      '60': 0.222,
      '70': 0.203,
      '80': 0.186,
      '90': 0.170,
      '100': 0.155,
      '110': 0.142,
      '120': 0.130
    },
    '90': {
      '30': 0.295,
      '40': 0.270,
      '50': 0.247,
      '60': 0.226,
      '70': 0.206,
      '80': 0.188,
      '90': 0.172,
      '100': 0.157,
      '110': 0.144,
      '120': 0.132
    },
    '100': {
      '30': 0.298,
      '40': 0.272,
      '50': 0.249,
      '60': 0.228,
      '70': 0.208,
      '80': 0.190,
      '90': 0.174,
      '100': 0.159,
      '110': 0.145,
      '120': 0.133
    },
    '110': {
      '30': 0.300,
      '40': 0.274,
      '50': 0.251,
      '60': 0.229,
      '70': 0.209,
      '80': 0.191,
      '90': 0.175,
      '100': 0.160,
      '110': 0.146,
      '120': 0.134
    },
    '120': {
      '30': 0.301,
      '40': 0.275,
      '50': 0.252,
      '60': 0.230,
      '70': 0.210,
      '80': 0.192,
      '90': 0.176,
      '100': 0.161,
      '110': 0.147,
      '120': 0.134
    }
  };

  constructor() { }

  srm2Rgb(srm: number): string {
    if (srm > 40) {
      return "black";
    } else if (srm < 1) {
      return "white";
    } else {
      return CalcService.SRM[Math.round(srm)];
    }
  };

  gravity2Ppg(gravity) {
    return gravity * 1000 - 1000;
  }

  lts2Gal(liters) {
    return liters * 0.264172052637296;
  }

  kg2lbs(value: number) {
    return value / 0.45359;
  }

  kg2Oz (kg) {
      return kg * 1000 * 0.035274;
  }

  ppg2Gravity(ppg: number) {
    return this.round((ppg + 1000) / 1000, 1000);
  }

  abv(og, fg) {
    return (this.gravity2Ppg(og) - this.gravity2Ppg(fg)) * 0.131;
  }

  bv(og, fg, ibu) {
    let rte = 0.82 * this.gravity2Ppg(fg) + 0.18 * this.gravity2Ppg(og);
    return 0.8 * ibu / rte;
  }

  balance(ibus, og) {
    return ibus / this.gravity2Ppg(og);
  }

  og(batchSize: number, efficiency: number, fermentables: Fermentable[], excludeSugar = false) {
    return this.ppg2Gravity(
      _.sumBy(fermentables, f => {
        let v = 0;
        if (!excludeSugar || f.type.toString() !== FermentableType[FermentableType.Sugar]) {
          v = this.kg2lbs(f.amount) * this.gravity2Ppg(f.potential) * (efficiency / 100) / this.lts2Gal(batchSize);
        }
        return v;
      })
    );
  }

  ibu(hops: Hop[], ogNoSugar: number, batchSize: number) {
    return _.sum(hops.map(h=>this.singleIbu(h,ogNoSugar,batchSize)));
  }

  singleIbu(hop: Hop, ogNoSugar: number, batchSize: number) {
    let U = this.calculateU(ogNoSugar, hop.time);
    let baseIBU = this.kg2Oz(hop.amount) * hop.alpha * U * (7489 / 100) / this.lts2Gal(batchSize);
    return baseIBU * this.getUtilization(hop.use.toString()) * this.getUtilization(hop.form.toString());
  }

  private getUtilization(use: string) {
    let f = new Map<string,number>();
    f.set(HopForm[HopForm.Pellet],1);
    f.set(HopForm[HopForm.WholeLeaf],0.9);
    f.set(HopForm[HopForm.Plug],0.92);
    f.set(HopUse[HopUse.Boil],1);
    f.set(HopUse[HopUse.FWH],1.1);
    f.set(HopUse[HopUse.DryHop],0);
    f.set(HopUse[HopUse.Aroma],0.5);
    f.set(HopUse[HopUse.Mash],0.2);
    return f.get(use);
  }

  calculateU(gravity, time) {
    var g = this.gravity2Ppg(gravity);
    var m = 30;
    var M = 120;
    for (var i = 0; i < CalcService.U_gravity.length; i++) {
      if (g < CalcService.U_gravity[i]) {
        M = CalcService.U_gravity[i];
        break;
      } else {
        m = CalcService.U_gravity[i];
      }
    }
    var diff = M - m;
    var p = (g - m) / diff; //proporcion
    if (p == Infinity || isNaN(p)) {
      p = 0;
    }

    var valm;
    var valM;
    if (CalcService.U[time.toString()]) {
      valm = CalcService.U[time.toString()][m.toString()];
      valM = CalcService.U[time.toString()][M.toString()];
    } else {
      valm = 0;
      valM = 0;
    }

    var valDiff = valM - valm; //Diff de valores
    var valP = valDiff * p;
    return valm + valP;
  }

  round(value, zeros) {
    return Math.round(value * zeros) / zeros;
  }

}

@Pipe({ name: 'srm2Rgb' })
export class Srm2Rgb implements PipeTransform {

  constructor(private calcService: CalcService) { }

  transform(srm: number): string {
    return this.calcService.srm2Rgb(srm);
  }
}

@Pipe({ name: 'gravity2Ppg' })
export class Gravity2Ppg implements PipeTransform {

  constructor(private calcService: CalcService) { }

  transform(gravity: number): number {
    return this.calcService.gravity2Ppg(gravity);
  }
}