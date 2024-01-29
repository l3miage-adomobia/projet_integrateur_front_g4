
  
export interface Festival {
    idFestival : number;
    nomFestival: string;
    tarif: number;
    siteWeb: string;
    dateDebut: Date;
    dateFin: Date;
    lieuPrincipal: string;
    nombrePass: number;
    domaine: Domaine;
    covoiturages: OffreCovoiturage[];
  }

export interface Domaine {}

export interface Domaine {
    nomDomaine: string;
  }

export interface OffreCovoiturage {
  idOffreDeCovoiturage : number;
  nbPlacesOffertes: number;
  modeleVoiture: string;
  etapes : Etape[];
  //festival : Festival;
  covoitureur : Utilisateur;
}

export interface Etape{
  //faux pour l'instant à modifier
  depart : string;
  villeArrivee : string;
  heureDepart : string;
  tarif : number;
}


export interface Utilisateur{
  //faux pour l'instant à modifier
  nom : string;
  age : number;
  email : string;
}