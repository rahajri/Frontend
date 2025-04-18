import { Component, Output, EventEmitter } from '@angular/core';
import { CookieConsent } from './cookie-consent.service';

@Component({
  selector: 'app-cookie-policy-popup',
  template: `
    <div class="cookie-policy-backdrop">
      <div class="cookie-policy-popup">
        <button class="close-btn" title="Fermer" (click)="close.emit()">
          &times;
        </button>
        <h2>POLITIQUE DE CONFIDENTIALITE - INTERIM ONLINE</h2>
        <div class="cookie-policy-content ms-3">
          <p>
            Le présent document est la Politique de confidentialité du site
            internet Interim Online, disponible via l’URL suivante :
            <a href="https://interim-online.fr/" target="_blank"
              >https://interim-online.fr/
            </a>
            (ci-après le « <strong>Site</strong> »).
          </p>

          <p>
            Le Site est un outil de recherche d’emploi en ligne mettant en
            relation les candidats et les entreprises, qui permet à des
            entreprises de publier des offres d’emploi, à des candidats d’y
            postuler et aux entreprises et candidats d’entrer en contact
            (ci-après les « <strong>Services</strong> »).
          </p>

          <p>
            Pour en savoir plus sur les Services, vous pouvez consulter les
            <u>Conditions Générales d’Utilisation pour les candidats</u> ou les
            <u
              >Conditions Générales d’Utilisation pour les entreprises du
              Site</u
            >.
          </p>

          <p>
            Pour en savoir plus sur les cookies, vous pouvez consulter la
            <u>Politique Cookies</u>.
          </p>

          <h2 class="h4">
            Qui est responsable des traitements de données effectués via le Site
            ?
          </h2>
          <P
            >Le Site est édité par la société Interim Online Pro-Tech, société
            par actions simplifiée à associé unique et au capital de 80.000
            euros, dont le siège social est situé au 52 rue de Dunkerque 75009
            Paris, France, inscrite au Registre du Commerce et des Sociétés de
            Paris sous le numéro 880 965 439, (ci-après la « Société Interim
            Online ») qui a la qualité de « responsable du traitement » au sens
            de la législation applicable en matière de protection des données
            personnelles.</P
          >
          <P
            >La Société Interim Online s’engage à respecter votre vie privée et
            à protéger vos données personnelles.</P
          >
          <h2 class="h4">
            Quelles catégories de données personnelles sont traitées via le Site
            ?
          </h2>
          <P
            >La Société Interim Online collecte directement les informations
            suivantes auprès de vous lorsque vous utilisez le Site :</P
          >
          <ul class="first">
            <li>
              Vos données d’identification et de contact (par exemple, vos nom
              et prénom, adresse e-mail, numéro de téléphone, votre profession,
              votre CV) nécessaires à votre inscription et connexion à votre
              compte et pour répondre à vos demandes ;
            </li>
            <li>
              Vos données permettant votre recherche d’emploi (par exemple,
              votre profession, vos spécialités techniques, votre photographie,
              votre périmètre de recherche, vos informations se trouvant dans
              votre CV, la détention du permis de conduire) lorsque vous êtes un
              candidat ;
            </li>
            <li>
              Vos données permettant votre recherche de candidats (par exemple :
              identification précise de l’entreprise, votre fonction au sein de
              cette entreprise, ensemble des informations relatives à votre
              recherche : mots-clés, titre métiers, lieu, domaine d’activité,
              type de contrat, type de salaire, date, etc.) lorsque vous êtes
              une entreprise ;
            </li>
            <li>
              Vos données relatives au suivi de votre compte (par exemple, votre
              identifiant, l’historique de vos candidatures/ des candidatures
              reçues) ;
            </li>
          </ul>
          <P
            >Les données personnelles indispensables à Interim Online pour
            remplir les finalités décrites ci-dessous sont signalées au moment
            de leur collecte. Si vous ne renseignez pas ces champs obligatoires,
            Interim Online ne pourra pas répondre à vos demandes et/ou vous
            fournir les Services d’Interim Online. Les autres informations ont
            un caractère facultatif et permettent d'améliorer les services
            d’Interim Online à votre égard.</P
          >
          <P
            >D’autres données sont collectées automatiquement lorsque vous
            naviguez sur le Site.</P
          >
          <P
            >Il s’agit de données de connexion et de navigation (terminal
            utilisé, votre adresse IP, votre type de navigateur et des
            informations de navigation). Ces données sont collectées pour
            permettre le bon fonctionnement du Site, mais également pour mesurer
            l’audience, ou pour vous proposer des fonctionnalités en lien avec
            les réseaux sociaux et de la publicité en fonction des choix
            effectués pour le dépôt de cookies.</P
          >

          <h2 class="h4">
            Sur quelles bases légales et pour quelles finalités sont traitées
            vos données personnelles ?
          </h2>

          <p>
            <strong
              >• La Société Interim Online collecte et traite des données
              personnelles vous concernant sur la base de votre consentement
              pour :</strong
            >
          </p>

          <ul class="ms-3 second">
            <li>
              Vous adresser des informations sur les nouvelles offres d’emploi/
              les nouveaux candidats en recherche d’emploi ;
            </li>
            <li>
              Améliorer le fonctionnement et la pertinence du Site en réalisant
              des statistiques d’audience ;
            </li>
            <li>
              Vous fournir des fonctionnalités en lien avec les réseaux sociaux
              ;
            </li>
            <li>
              Vous afficher de la publicité sur le Site, y compris de la
              publicité personnalisée en fonction de votre profil et de votre
              navigation.
            </li>
          </ul>

          <p>
            Pour plus de détails sur ces trois derniers points, vous pouvez
            consulter la <u>Politique Cookies</u>.
          </p>

          <p>
            <strong
              >• La Société Interim Online collecte et traite des données
              personnelles vous concernant sur la base de l’exécution des
              Conditions Générales d’Utilisation que vous avez acceptées
              :</strong
            >
          </p>

          <ul class="ms-3 second">
            <li>Vous permettre de créer un compte et d’y accéder .</li>
            <li>
              Vous permettre de publier votre CV, de rechercher des offres
              d’emploi et d’y postuler lorsque vous êtes candidat.
            </li>
            <li>
              Vous permettre de publier des offres d’emploi et de rechercher des
              candidats lorsque vous êtes une entreprise .
            </li>
            <li>
              Vous mettre en relation entre candidats et entreprises afin de
              vous faciliter vos recherches.
            </li>
          </ul>

          <p>
            <strong
              >• La Société Interim Online collecte et traite des données
              personnelles vous concernant sur la base de son intérêt légitime
              :</strong
            >
          </p>

          <ul class="ms-3 second">
            <li>
              Assurer le bon fonctionnement du Site de manière sécurisée sur la
              base de son intérêt à gérer son Site .
            </li>
            <li>
              Répondre à vos questions et demandes lorsque vous la contactez via
              la rubrique « Formulaire contact » sur la base de son intérêt à
              assurer une réponse à ses internautes.
            </li>
          </ul>

          <h2 class="h4">
            Qui sont les destinataires de vos données personnelles collectées
            via le Site ?
          </h2>

          <p>
            <strong
              >• Gestion du Site et de la relation avec vous en tant
              qu’utilisateur du Site et des Services proposés par la Société
              Interim Online</strong
            >
          </p>

          <p class="ms-3">
            Le personnel autorisé de la Société Interim Online a accès aux
            données personnelles collectées auprès de vous, afin de permettre le
            bon fonctionnement du Site et de corriger les éventuels incidents
            techniques et de gérer la relation avec vous en tant qu’utilisateur
            du Site et des Services.
          </p>

          <p>
            <strong>• Mise en relation candidat/emploi </strong>
          </p>
          <p class="ms-3">
            Lorsque vous êtes candidat et que vous déposez votre CV ou
            candidatez à une offre d’emploi, les informations relatives à votre
            recherche d’emploi (y compris identité, contact, CV) seront
            transmises aux entreprises en recherche d’un profil correspondant au
            vôtre et à l’entreprise de l’offre d’emploi. Lorsque vous êtes une
            entreprise, les informations relatives à votre recherche de
            candidats (y compris identité et contact) seront transmises aux
            potentiels candidats.
          </p>
          <p>
            <strong
              >• Cookies : Mesures d’audience/ Réseaux Sociaux/ Publicité
            </strong>
          </p>
          <p class="ms-3">
            Vos données personnelles sont transmises aux tiers déposant des
            cookies sur le Site, en fonction des choix effectués par
            l’Utilisateur via la bannière cookies, sous réserve de votre
            consentement, dans les conditions prévues dans la Politique Cookies.
          </p>
          <p>
            <strong>• Prestataires ou fournisseurs tiers </strong>
          </p>
          <p class="ms-3">
            Vos données personnelles sont également communiquées par la Société
            Interim Online à des sous-traitants ou des fournisseurs de services,
            qui interviennent à titre purement technique ou logistique (les
            fournisseurs de services d’hébergement et de maintenance sur le
            Site) ou pour les cookies.
          </p>
          <p class="ms-3">
            L’hébergeur du Site est la société OVH, société par actions
            simplifiée à associé unique, dont le siège social est situé au 2,
            rue Kellermann, 59100 Roubaix, inscrite au Registre du Commerce et
            des Sociétés de Lille sous le numéro 424 761 419.
          </p>
          <p>
            <strong
              >• Protection et défense des droits de la Société Interim
              Online</strong
            >
          </p>

          <p class="ms-3">
            Vos données personnelles pourront être communiquées à des tiers
            lorsqu’une telle communication sera requise par la loi, une
            disposition réglementaire ou une décision judiciaire, ou si cette
            communication est nécessaire en cas de litige.
          </p>

          <h2 class="h4">
            Transferts de vos données personnelles en dehors de l’EEE : pourquoi
            et comment ?
          </h2>

          <p class="ms-3">
            Vos données personnelles sont transférées hors de l’Espace
            Economique Européen, notamment en raison du recours à des
            prestataires situés hors de l’EEE et à des tiers déposant des
            cookies sur le Site.
          </p>
          <p class="ms-3">
            Dans ce cas, ces transferts sont effectués moyennant des garanties
            appropriées permettant d’assurer un niveau de protection suffisant
            de la vie privée et des droits fondamentaux, notamment la signature
            des clauses contractuelles types adoptées par la Commission
            européenne. Un document recensant les garanties mises en œuvre par
            la Société Interim Online vous sera communiqué si vous en faites la
            demande par e-mail à l’adresse suivante :
            <a href="mailto:contact@interim-online.fr" style="color:#E65425;">{{
              'contact@interim-online.fr'
            }}</a>
          </p>

          <h2 class="h4">
            Quels sont vos droits sur vos données personnelles ?
          </h2>

          <p style="font-weight: bold;"><u>Accès et rectification</u></p>
          <p class="ms-3">
            Vous avez le droit d'accéder à vos données personnelles et de
            demander la rectification de toutes données qui s’avèreraient
            inexactes. Si vous disposez d’un compte, vous pouvez accéder
            directement aux données contenues dans votre compte en ligne, les
            rectifier/supprimer.
          </p>
          <p style="font-weight: bold;"><u>Autres droits</u></p>
          <div class="ms-3">
            <p>
              <strong>Effacement :</strong> Vous pouvez également demander
              l'effacement de vos données personnelles à condition qu'il ne soit
              plus nécessaire pour la Société Interim Online de les conserver.
            </p>
            <p>
              <strong>Opposition et limitation du traitement :</strong> Vous
              pouvez également vous opposer au traitement de vos données
              personnelles ou demander une restriction de ce traitement, à moins
              que celui-ci ne soit nécessaire pour la gestion des Services que
              vous demandez
            </p>
            <p>
              <strong>Retrait du consentement :</strong> Lorsque le traitement
              de vos données personnelles est basé sur votre consentement, vous
              pouvez alors le retirer à tout moment. Le retrait de votre
              consentement ne remettra pas en cause la légalité des traitements
              d’ores et déjà effectués
            </p>
            <p>
              <strong>Portabilité :</strong> En outre, vous pouvez exercer votre
              droit à la portabilité, c'est-à-dire obtenir, sous une forme
              structurée et lisible par machine, les données personnelles que
              vous avez fournies, directement sur la base de son consentement ou
              sur la base des Conditions Générales d’Utilisation, à condition
              que ce traitement soit automatisé
            </p>
            <p>
              <strong>Directives :</strong> Vous pouvez également donner vos
              directives concernant la conservation, l’effacement et la
              divulgation de vos données personnelles après votre décès, et
              modifier vos directives à tout moment.
            </p>
          </div>

          <p class="ms-2">
            Vous pouvez faire une réclamation auprès de la CNIL, suivant le
            processus décrit sur son site
            <a href="https://www.cnil.fr" target="_blank" style="color:#E65425;"
              >https://www.cnil.fr</a
            >
            ou auprès de l'autorité de protection des données du pays dans
            lequel vous résidez ou travaillez habituellement, selon le droit
            applicable.
          </p>
          <p class="ms-2">
            Ces droits peuvent être exercés à tout moment en contactant la
            Société Interim Online via la section « Nous contacter » sur le Site
            ou en envoyant un e-mail à
            <a href="mailto:contact@interim-online.fr" style="color:#E65425;">{{
              'contact@interim-online.fr'
            }}</a>
            ou par courrier adressé à son siège social au 52, rue de Dunkerque,
            75009 Paris, France.
          </p>

          <h2 class="h4">
            Pendant quelle durée vos données sont-elles conservées ?
          </h2>

          <p class="ms-3">
            Vos données personnelles sont conservées pour le temps nécessaire à
            l’accomplissement des finalités décrites énoncées dans la présente
            Politique, conformément aux règlementations et législations
            applicables sur la protection des données personnelles. Ces durées
            sont détaillées plus bas.
          </p>

          <p class="ms-3">
            Pour les besoins du présent article, il convient de préciser que :
          </p>

          <ul class="ms-3 second">
            <li class="ms-3">
              la conservation en base active désigne la durée nécessaire à la
              réalisation de l’objectif (finalité du traitement) ayant justifié
              la collecte/enregistrement des données. En pratique, les données
              seront alors facilement accessibles dans l’environnement de
              travail immédiat pour les services opérationnels qui sont en
              charge de ce traitement.
            </li>
            <li class="ms-3">
              la conservation en archive intermédiaire désigne la durée pendant
              laquelle les données personnelles ne sont plus utilisées pour
              atteindre l’objectif fixé (« dossiers clos ») mais présentent
              encore un intérêt administratif pour la Société Interim Online ou
              doivent être conservées pour répondre à une obligation légale. Les
              données peuvent alors être consultées de manière ponctuelle et
              motivée par des personnes spécifiquement habilitées.
            </li>
          </ul>

          <p><strong>Réclamations</strong></p>
          <p class="ms-3">
            Vos informations relatives à toute demande et requête collectées et
            traitées dans le cadre de contact avec les personnels sont
            conservées le temps de répondre à la demande en base active et
            pendant 3 ans à compter du dernier contact avec vous en archive
            intermédiaire.
          </p>
          <p><strong>Données de compte</strong></p>
          <p class="ms-3">
            Votre compte sur le Site restera actif tant que vous n’aurez pas
            décidé de le clôturer. En l’absence d’activité de votre part, vos
            données de compte seront conservées en archive intermédiaire pendant
            trois (3) ans. En cas d’inactivité prolongée de votre part pendant
            une période de 3 ans, ce compte sera désactivé et vos données
            afférentes seront supprimées.
          </p>
          <p class="ms-3">
            Dans tous les cas, vous disposez de la faculté à tout moment de
            clôturer votre compte, en cliquant sur « Supprimer mon compte » sur
            le Site.
          </p>
          <p><strong>Données de CV</strong></p>
          <p class="ms-3">
            Vos données de CV sont conservées pendant une durée de 2 ans à
            compter de leur recueil/publication en base active. A l’issue de ce
            délai et en l’absence de mise à jour de votre part, ces données
            seront supprimées.
          </p>
          <p class="ms-3">
            Dans tous les cas, vous pouvez supprimer votre recherche d’emploi et
            votre CV à tout moment via votre compte sur le Site.
          </p>
          <p><strong>Cookies</strong></p>
          <p class="ms-3">
            S’agissant de la durée de conservation en matière de cookies, voir
            la <u>Politique Cookies</u>.
          </p>
          <p class="ms-3">
            Vos données personnelles seront supprimées à l'expiration des délais
            mentionnés dans cet article
          </p>
          <h2 class="h4">Comment nous contacter pour toutes questions ?</h2>
          <p class="ms-3">
            En cas de questions sur la politique de confidentialité et les
            pratiques de la Société Interim Online en matière de protection des
            données personnelles, vous pouvez contacter la Société Interim
            Online :
          </p>

          <ul class="ms-3 second">
            <li class="ms-3">sur le Site via la rubrique « Nous contacter »</li>
            <li class="ms-3">
              par courrier électronique à
              <a
                href="mailto:contact@interim-online.fr"
                style="color:#E65425;"
                >{{ 'contact@interim-online.fr' }}</a
              >
            </li>
            <li class="ms-3">
              ou par courrier adressé à son siège social au 52, rue de
              Dunkerque, 75009 Paris, France
            </li>
          </ul>

          <p class="ms-3">
            En cas de contestation concernant la manière dont la Société Interim
            Online collecte et traite vos données personnelles, vous pouvez
            introduire une réclamation auprès de la CNIL via le lien suivant :
            <a href="https://www.cnil.fr/fr/plaintes/" style="color:#E65425;"
              >https://www.cnil.fr/fr/plaintes/</a
            >.
          </p>

          <h2 class="h4">Comment cette Politique peut-elle être modifiée ?</h2>
          <p class="ms-3">
            La Politique de confidentialité peut être modifiée et mise à jour
            pour refléter les changements dans les pratiques de la Société
            Interim Online, ou pour assurer le respect de la règlementation en
            cas de modification de celle-ci.
          </p>
          <p class="ms-3">
            Dans ce cas, la Politique de confidentialité révisée sera mise en
            ligne sur le Site, avec mention de la dernière date de mise à jour
            et vous en serez informé par une bannière affichée sur le Site vous
            invitant à consulter la Politique de confidentialité mise à jour .
          </p>

          <!-- ================================================ -->

          <div class="policy-text d-flex justify-content-center">
            <div>
              <label
                ><input
                  type="checkbox"
                  [checked]="consent.necessary"
                  disabled
                />
                Cookies nécessaires (toujours activés)</label
              ><br />
              <label
                ><input type="checkbox" [(ngModel)]="consent.analytics" />
                Cookies analytiques</label
              ><br />
              <label
                ><input type="checkbox" [(ngModel)]="consent.marketing" />
                Cookies marketing</label
              ><br />
              <label
                ><input type="checkbox" [(ngModel)]="consent.preferences" />
                Cookies de préférences</label
              >
            </div>
          </div>
        </div>
        <div class="cookie-policy-actions">
          <button (click)="save()">Enregistrer mes choix</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .cookie-policy-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.25);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cookie-policy-popup {
        background: #fff;
        padding: 2.5rem 2rem;
        border-radius: 18px;
        max-width: 1020px;
        width: 100%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
        display: flex;
        flex-direction: column;
        animation: popup-fade-in 0.3s;
        position: relative;
      }
      @keyframes popup-fade-in {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .cookie-policy-popup h2 {
        margin-top: 0;
        color: var(--primary-color, #ff5b37);
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 1.2rem;
      }
      .cookie-policy-content {
        max-height: 260px;
        overflow-y: auto;
        margin-bottom: 1.5rem;
        font-size: 1rem;
        color: #222;
        padding-right: 2px;
      }
      .cookie-policy-content label {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
        font-size: 1rem;
      }
      .policy-text {
        font-size: 0.6em;
        color: #666;
        margin-top: 1.2em;
        background: #f8f9fa;
        border-radius: 8px;
        padding: 0.7em 1em;
      }
      .cookie-policy-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1em;
      }
      .cookie-policy-actions button {
        min-width: 120px;
        padding: 0.5rem 1.2rem;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-family: inherit;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
      }
      .cookie-policy-actions button:first-child {
        background: var(--primary-color, #ff5b37);
        color: #fff;
      }
      .cookie-policy-actions button:hover {
        background: #e65425;
        color: #fff;
      }
      /* --- Added styles for ul and li --- */
      .cookie-policy-content ul {
        list-style: none;
        padding: 0;
        margin: 0 0 1em 0;
      }
      .cookie-policy-content li {
        position: relative;
        padding-left: 1.5em;
        margin-bottom: 0.75em;
        font-size: 1rem;
        color: #333;
      }
      .cookie-policy-content ul.first li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.6em;
        width: 0.5em;
        height: 0.5em;
        background: #179ab5;
        border-radius: 50%;
        display: inline-block;
      }
      .cookie-policy-content ul.second li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.6em;
        width: 0.5em;
        height: 0.2em;
        background: #179ab5;
        display: inline-block;
      }
      .close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 32px;
        height: 32px;
        background: #179ab5;
        border: 2px solid #179ab5;
        border-radius: 50%;
        font-size: 25px;
        font-weight: bold;
        cursor: pointer;
        color: #fff;
        transition: color 0.2s ease, border-color 0.2s;
        z-index: 2;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
      .close-btn:hover {
        color: #fff;
        background: #e65425;
        border-color: #e65425;
      }
    `,
  ],
})
export class CookiePolicyPopupComponent {
  @Output() saveConsent = new EventEmitter<CookieConsent>();
  @Output() close = new EventEmitter<void>();

  consent: CookieConsent = {
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
    given: false,
    refused: false,
  };

  ngOnInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  save() {
    this.saveConsent.emit(this.consent);
  }
}
