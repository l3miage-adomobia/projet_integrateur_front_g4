
  
export interface Festival {
    idFestival : number;
    nomFestival: string;
    tarif: number;
    siteWeb: string;
    dateDebut: Date;
    dateFin: Date;
    lieuPrincipal: string;
    nombrePass: number;
    sousDomaine: SousDomaine;
    covoiturages: OffreCovoiturage[];
  }

export interface SousDomaine {}

export interface Domaine {
    nomDomaine: string;
  }

export interface OffreCovoiturage {}