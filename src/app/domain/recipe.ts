import { ChangeService } from '../services/change.service';
import { CalcService } from '../services/calc.service';
export class Recipe {

    constructor(
        public name: string,
        public style: string,
        public vital: Vital,
        public amoutFermentables: number,
        public fermentables: Fermentable[]
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
            amoutFermentables: this.recipe.totalAmount,
            fermentables: this.recipe.FERMENTABLES.FERMENTABLE.map(f => {
                return {
                    name: f.NAME,
                    amount: f.AMOUNT,
                    type: f.TYPE, 
                    srm: f.COLOR,
                    potential: f.POTENTIAL,
                    use: f.USE,
                }
            })
        };
    }
}