
  
export interface Festival {
    idFestival : number;
    nomFestival: string;
    tarif: number;
    siteWeb: string;
    dateDebut: Date;
    dateFin: Date;
    lieuPrincipal: string;
    nombrePass: number;
    domaine: string;
    covoiturages: OffreCovoiturage[];
  }

export interface SousDomaine {
    idSousDomaine: number;
    nomSousDomaine: string;
    nomDomaine: string;
}

export interface Domaine {
    nomDomaine: string;
  }

export interface OffreCovoiturage {
  idOffreDeCovoiturage : number;
  nbPlaces: number;
  modeleVoiture: string;
  etapes : Etape[];
  festival : Festival;
  nomCovoitureur : Utilisateur;
  nomCommune : string;
}
export interface Resa {
  idEtape : number;
  nbPlacesReserve: number;
  mailUtilisateur: string;

}
export interface Etape{

  idEtape: number;
    nbPlaces: 4;
    nomCovoitureur: string;
    modeleVoiture: string;
    latitude: string;
    longitude: string;
    nomCommune: string;
    tarif: number;
    duree: number;
    dateDepart: string;
}

export interface ArretCovoiturage{

}

export interface Utilisateur{
  //faux pour l'instant à modifier
  nom : string;
  age : number;
  email : string;
}