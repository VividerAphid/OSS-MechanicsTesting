class AphidRandom{

    constructor(seed){
         this.fermPrime = 131073;
         this.rootMod = 75;
         this.fermPrimeDiv = this.fermPrime - 1;
         this.setSeed(seed);
    }
 
 
     aphidLehmer(x){
         return (x * this.rootMod) % this.fermPrime;
     }
 
     minMaxInt(min, max, x){
         return min + (x % (max - min));
     }
 
     minMaxDec(min, max, x){
         return min + ((max - min) * x);
     }
 
     rangeInt(min, max){
         this.newSeed = this.aphidLehmer(this.newSeed);
         return this.minMaxInt(min, max, this.newSeed);
     }
 
     rangeDec(min, max){
         this.newSeed = this.aphidLehmer(this.newSeed);
         return this.minMaxDec(min, max, (this.minMaxInt(0, this.fermPrime, this.newSeed)/ this.fermPrimeDiv));
     }
 
     verifySeed(seed){
         if(typeof seed != "number"){
             let total = 0;
             for(let r = 0; r < seed.length; r++){
                total *= 17;
                total += seed.charCodeAt(r);
             }
             seed = total;
         }
         return seed;
     }
 
     setSeed(seed){
         if(seed){
             let checkedSeed = this.verifySeed(seed);
             this.newSeed = checkedSeed;
             this.baseSeed = checkedSeed;
         }
         else{
             this.baseSeed = 16384;
             this.newSeed = this.baseSeed;
         }
     }
 
}