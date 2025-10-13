# track location with the map using the phone number
import phonenumbers
from phonenumbers import geocoder, carrier

import folium
from opencage.geocoder import OpenCageGeocode

# taking input the phonenumber along with the country code
# Parsing the phonenumber string to convert it into phonenumber format
phone_number = phonenumbers.parse(
    input("Enter the PhoneNumber with the country code : ")
)

# Using the geocoder module of phonenumbers to print the Location
location = geocoder.description_for_number(phone_number, "en")
print(f"Location : {location}")

# Using the carrier module of phonenumbers to print the service provider name
service_provider = carrier.name_for_number(phone_number, "en")
print(f"Service provider : {service_provider}")

""" 
generate your api https://opencagedata.com/api
Using opencage to get the latitude and longitude of the location
"""
# opengeocoder = OpenCageGeocode("")
# results = opengeocoder.geocode(str(location))

# Assigning the latitude and longitude values to the lat and lng variables
# lat = results[0]["geometry"]["lat"]
# lng = results[0]["geometry"]["lng"]

# Getting the map for the given latitude and longitude
# map = folium.Map(location=[lat, lng], zoom_start=9)

# Adding a Marker on the map to show the location name
# folium.Marker([lat, lng], popup=location).add_to(map)

# save map to html file to open it and see the actual location in map format
# map.save("output/PhoneNumberLocation.html")
