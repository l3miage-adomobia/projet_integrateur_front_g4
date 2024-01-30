export interface Reservation {
    id: number;
    nomFestival: string;
    dateDebutFestival: string;
    dateFinFestival: string;
    lieuPrincipaleFestival: string;
    domaineFestival: string;
    sousDomaineFestival?: string;
    nomCovoitureur: string;
    modeleVehicule: string;
    lieuEtapeCovoiturage: string;
    heureCovoiturage: string;
    dateCovoiturage: string;
    nombrePlacesChoisies: number;
    tarifCovoiturage: number;
    tarifFestival: number;
}
