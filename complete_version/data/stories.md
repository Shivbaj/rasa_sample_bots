## news path 1
* greet
  - utter_greet
* city_weather
  - action_match_news
  - utter_did_that_help
* affirm or thanks
  - utter_gratitude
* goodbye
  - utter_goodbye

## news path 2
* city_weather
  - action_match_news
  - utter_did_that_help
* affirm or thanks
  - utter_gratitude
* goodbye
  - utter_goodbye

## news path 3
* greet
  - utter_greet
* city_weather
  - action_match_news
  - utter_did_that_help
* deny
  - utter_ask_again
* city_weather
  - action_match_news
  - utter_did_that_help
* affirm or thanks
  - utter_gratitude
* goodbye
  - utter_goodbye
  
## car lights on path-1
* greet
  - utter_greet
* car_light_on
  - utter_light_on
* affirm or thanks
  - utter_gratitude
* goodbye
  - utter_goodbye
  
## car lights on path-2
* car_light_on
  - utter_light_on
  
## car lights off path-1
* greet
  - utter_greet
* car_light_off
  - utter_light_off
* affirm or thanks
  - utter_gratitude
* goodbye
  - utter_goodbye
  
## car lights off path-2
* car_light_off
  - utter_light_off


## greet path
* greet
  - utter_greet

## goodbye path
* goodbye
  - utter_goodbye