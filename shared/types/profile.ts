export interface SpokenLanguage {
  name: string
  level: string
}

export interface ProfileLinks {
  email: string
  linkedin: string
  github: string
}

export interface Profile {
  name: string
  title: string
  location: string
  bio: string
  languages: SpokenLanguage[]
  links: ProfileLinks
  /** Public path to the CV file. */
  cvUrl: string
}
