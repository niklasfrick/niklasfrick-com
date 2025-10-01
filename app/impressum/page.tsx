import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum und rechtliche Angaben zu Niklas Frick - Liechtenstein',
}

export default function ImpressumPage() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <h1>Impressum</h1>

      <h2>Angaben nach dem liechtensteinischen Mediengesetz</h2>
      <h3>Medieninhaber und Herausgeber</h3>
      <p>
        <strong>Niklas Frick</strong>
        <br />
        Gapetschstrasse 57
        <br />
        9494 Schaan
        <br />
        Fürstentum Liechtenstein
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{' '}
        <a href="mailto:contact@niklasfrick.com">contact@niklasfrick.com</a>
      </p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        Niklas Frick
        <br />
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen des Fürstentums Liechtenstein verantwortlich.
        Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte
        fremde Informationen zu überwachen oder nach Umständen zu forschen, die
        auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem liechtensteinischen und internationalen
        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
        Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen
        der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>

      <h2>Anwendbares Recht</h2>
      <p>
        Es gilt das Recht des Fürstentums Liechtenstein. Bei Streitigkeiten sind
        die Gerichte des Fürstentums Liechtenstein zuständig.
      </p>
    </div>
  )
}
