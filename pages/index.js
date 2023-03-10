import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client"
import client from "../apollo-client"

export default function Home({ countries }) {
  return (
    <div className={styles.grid}>
      <Head>
        <title>Countries of the world</title>
        <meta name="description" content="List of countries of the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {countries.map(country => {
        const { code, name, emoji, capital, continent: { name: continentName }, currency, languages } = country
        return (
          <div
            key={code}
            className={styles.card+' '+styles.clickableCard}
          >
            <a href={"https://wikipedia.org/wiki/"+name.split(' ').join('_')} target="_blank" rel="noopener noreferrer">
              <h3>
                {/* <a id={code} href={"#"+code} aria-hidden="true" className="aal_anchor">
                  <svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
                  {name}
                </a> */}
                {name} ({emoji}) {currency}
              </h3>
              <p>
                {continentName}
              </p>
              <p>
                {capital} 
              </p>
              <ul>{languages.map(
                ({ name: languageName }) => (
                  <li key={languageName}>{languageName}</li>)
                )}
              </ul>
            </a>
          </div>
        )
      })}

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    query CountriesQuery {
      countries {
        code,
        name,
        emoji,
        capital,
        continent {
          name
        },
        currency,
        languages {
          name
        }
      }
    }
    `
  })

  return {
    props: {
      countries: data.countries
    }
  }
}