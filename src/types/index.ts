export interface IRadius {
  /** The Radius of all the Three Geometry */
  radius: number
}

export type City = string
export type LatLng = number
export type Country = string
export type CountryCode = string
export type Count = number
export type Radius = number

export interface ILocation {
  /** City name */
  city: City
  /** City Latitute */
  lat: LatLng
  /** City Longitude */
  lng: LatLng
  /** Country  name*/
  country: Country
  /** Country code */
  country_code: CountryCode
  /** Page Views count */
  count: Count
}
