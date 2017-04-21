import { ChangeService } from '../services/change.service';
import { CalcService } from '../services/calc.service';
export class Recipe {

    constructor(
        public name: string,
        public style: string,
        public vital: Vital,
        public amountFermentables: number,
        public fermentables: Fermentable[],
        public amountHops: number,
        public hops: Hop[]
    ) {}

    
}

export class Vital {
    constructor(
        public batchSize: number,
        public og: number,
        public fg: number,
        public abv: number,
        public ibu: number,
        public bugu: number,
        public efficiency: number,
        public bv: number
    ) {}
}

export class Fermentable {
    constructor(
        public name: string,
        public amount: number,
        public type: FermentableType, //Adjunct, Extract, Grain, Sugar
        public srm: number,
        public potential: number,
        public use: FermentableUse //Boil, etc
    ) {}
}

export enum FermentableType {
    Adjunct, Extract, Grain, Sugar
}

export enum FermentableUse {
    Mash, Recirculating, Boil, Fermentation, Maduration
}

export class Hop {
    constructor(
        public name: string,
        public alpha: number,
        public beta: number,
        public cohumulone: number,
        public amount: number,
        public use: HopUse,
        public temperature: number, //mas que nada para Arome, a que temperatura se hizo el uso del lupulo. 
        public time: number, //Tiempo de hervor, salvo DryHop que seria tiempo en dias, y Arome, que seria tiempo de contacto post enfriado (Para estos ultimos quiza deberia usar negativos)
        public form: HopForm
    ) {}
}

export enum HopUse {
    Mash, FWH, Boil, Aroma, DryHop
}

export enum HopForm {
    Pellet, WholeLeaf, Plug
}

export class EditableRecipe {

    constructor(
        public recipe: Recipe,
        private calcService: CalcService,
        private changeService: ChangeService
    ) {}

    change(field: string) {
        console.log('change', field)
        this.changeService.change(field, this);
    }
}

export class RecipeConverter {

    constructor(private recipe: any, private calcService: CalcService) {}

    convert(): Recipe {
        return {
            name: this.recipe.NAME,
            style: this.recipe.STYLE.NAME,
            vital: {
                batchSize: this.recipe.BATCH_SIZE,
                og: this.recipe.OG,
                fg: this.recipe.FG,
                abv: this.recipe.ABV,
                bugu: this.calcService.balance(this.recipe.CALCIBU,this.recipe.OG),
                ibu: this.recipe.CALCIBU,
                bv: this.recipe.BV,
                efficiency: this.recipe.EFFICIENCY
            },
            amountFermentables: this.recipe.totalAmount,
            fermentables: this.recipe.FERMENTABLES.FERMENTABLE.map(f => {
                return {
                    name: f.NAME,
                    amount: f.AMOUNT,
                    type: f.TYPE, 
                    srm: f.COLOR,
                    potential: f.POTENTIAL,
                    use: f.USE,
                }
            }),
            amountHops: this.recipe.totalHop,
            hops: this.recipe.HOPS.HOP.map(h => {
                return {
                    name: h.NAME,
                    alpha: h.ALPHA,
                    beta: null,
                    cohumulone: null,
                    amount: h.AMOUNT,
                    use: h.USE, 
                    temperature: null, 
                    time: h.TIME, 
                    form: h.FORM
                }
            })
        };
    }
}
           