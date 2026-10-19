export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const GlobalPartsFragmentDoc = gql`
    fragment GlobalParts on Global {
  __typename
  brandName
  wordmark
  tagline
  contactEmail
  contactPhone
  studioLocations
}
    `;
export const HeroPartsFragmentDoc = gql`
    fragment HeroParts on Hero {
  __typename
  eyebrow
  headlineLine1
  headlineLine2
  subcopy
  backgroundVideo
  posterImage
  primaryCtaText
  primaryCtaHref
}
    `;
export const CarPartsFragmentDoc = gql`
    fragment CarParts on Car {
  __typename
  giantTitle
  modelName
  badge
  description
  carCutoutImage
  specs {
    __typename
    label
    value
    unit
    detail
  }
}
    `;
export const DriversPartsFragmentDoc = gql`
    fragment DriversParts on Drivers {
  __typename
  name
  number
  nationality
  role
  image
  bio
  stats {
    __typename
    label
    value
  }
}
    `;
export const NewsPartsFragmentDoc = gql`
    fragment NewsParts on News {
  __typename
  title
  date
  category
  excerpt
  heroImage
  body
}
    `;
export const MerchPartsFragmentDoc = gql`
    fragment MerchParts on Merch {
  __typename
  name
  price
  category
  badge
  available
  image
  hoverImage
  description
  specs
}
    `;
export const GalleryPartsFragmentDoc = gql`
    fragment GalleryParts on Gallery {
  __typename
  films {
    __typename
    title
    duration
    provider
    videoUrl
    poster
    description
  }
  photos {
    __typename
    title
    image
    category
    caption
    width
    height
  }
}
    `;
export const GlobalDocument = gql`
    query global($relativePath: String!) {
  global(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
export const GlobalConnectionDocument = gql`
    query globalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GlobalFilter) {
  globalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GlobalParts
      }
    }
  }
}
    ${GlobalPartsFragmentDoc}`;
export const HeroDocument = gql`
    query hero($relativePath: String!) {
  hero(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HeroParts
  }
}
    ${HeroPartsFragmentDoc}`;
export const HeroConnectionDocument = gql`
    query heroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HeroFilter) {
  heroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HeroParts
      }
    }
  }
}
    ${HeroPartsFragmentDoc}`;
export const CarDocument = gql`
    query car($relativePath: String!) {
  car(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CarParts
  }
}
    ${CarPartsFragmentDoc}`;
export const CarConnectionDocument = gql`
    query carConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CarFilter) {
  carConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CarParts
      }
    }
  }
}
    ${CarPartsFragmentDoc}`;
export const DriversDocument = gql`
    query drivers($relativePath: String!) {
  drivers(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...DriversParts
  }
}
    ${DriversPartsFragmentDoc}`;
export const DriversConnectionDocument = gql`
    query driversConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: DriversFilter) {
  driversConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...DriversParts
      }
    }
  }
}
    ${DriversPartsFragmentDoc}`;
export const NewsDocument = gql`
    query news($relativePath: String!) {
  news(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NewsParts
  }
}
    ${NewsPartsFragmentDoc}`;
export const NewsConnectionDocument = gql`
    query newsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NewsFilter) {
  newsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NewsParts
      }
    }
  }
}
    ${NewsPartsFragmentDoc}`;
export const MerchDocument = gql`
    query merch($relativePath: String!) {
  merch(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...MerchParts
  }
}
    ${MerchPartsFragmentDoc}`;
export const MerchConnectionDocument = gql`
    query merchConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: MerchFilter) {
  merchConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...MerchParts
      }
    }
  }
}
    ${MerchPartsFragmentDoc}`;
export const GalleryDocument = gql`
    query gallery($relativePath: String!) {
  gallery(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GalleryParts
  }
}
    ${GalleryPartsFragmentDoc}`;
export const GalleryConnectionDocument = gql`
    query galleryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GalleryFilter) {
  galleryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GalleryParts
      }
    }
  }
}
    ${GalleryPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    global(variables, options) {
      return requester(GlobalDocument, variables, options);
    },
    globalConnection(variables, options) {
      return requester(GlobalConnectionDocument, variables, options);
    },
    hero(variables, options) {
      return requester(HeroDocument, variables, options);
    },
    heroConnection(variables, options) {
      return requester(HeroConnectionDocument, variables, options);
    },
    car(variables, options) {
      return requester(CarDocument, variables, options);
    },
    carConnection(variables, options) {
      return requester(CarConnectionDocument, variables, options);
    },
    drivers(variables, options) {
      return requester(DriversDocument, variables, options);
    },
    driversConnection(variables, options) {
      return requester(DriversConnectionDocument, variables, options);
    },
    news(variables, options) {
      return requester(NewsDocument, variables, options);
    },
    newsConnection(variables, options) {
      return requester(NewsConnectionDocument, variables, options);
    },
    merch(variables, options) {
      return requester(MerchDocument, variables, options);
    },
    merchConnection(variables, options) {
      return requester(MerchConnectionDocument, variables, options);
    },
    gallery(variables, options) {
      return requester(GalleryDocument, variables, options);
    },
    galleryConnection(variables, options) {
      return requester(GalleryConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/4.0/content/cc01855d-c4b0-4c14-9b75-360527291439/github/final-polishing",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
