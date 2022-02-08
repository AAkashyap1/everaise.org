import { Helmet } from 'react-helmet'

export default function Page(props) {
  return (
    <div>
      <Helmet>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={props.description} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={props.title} />
        <meta name="og:description" property="og:description" content={props.description} />
        <meta property="og:site_name" content={props.title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
      </Helmet>
      {props.children}
    </div>
  )
};