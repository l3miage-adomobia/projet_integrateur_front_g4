
  
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
  nbPlacesOffertes: number;
  modeleVoiture: string;
  etapes : Etape[];
  festival : Festival;
  covoitureur : Utilisateur;
}

export interface Etape{

  idEtape : number;
  tarif: number;
  duree: number;
  heureDepart: string; //temporaire
  depart?: ArretCovoiturage;
  offreCovoiturage?: OffreCovoiturage;
  villeArrivee: string;
}

export interface ArretCovoiturage{

}

export interface Utilisateur{
  //faux pour l'instant à modifier
  nom : string;
  age : number;
  email : string;
}