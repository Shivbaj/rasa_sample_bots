# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals
from datetime import datetime

import logging
import requests
import json
from rasa_core_sdk import Action

logger = logging.getLogger(__name__)

API_URL = "http://api.openweathermap.org/data/2.5/weather?q="
API_KEY = "602f76eef9fd5510d34ef48414f3552c"
CITY_NAME = ""

class ActionMatchSearch(Action):
	def name(self):
		return "action_match_news"

	def run(self, dispatcher, tracker, domain):
		CITY_NAME = tracker.get_slot('city')
		res = requests.get(API_URL + CITY_NAME + "&appid=" + API_KEY)
		print(res)
		if res.status_code == 200:
			weather_description  = res.json()["weather"][0]["description"]
			temperature = res.json()["main"]["temp"]
			##upcoming_match = data[1]
			##upcoming_match["date"] = datetime.strptime(upcoming_match["date"], "%Y-%m-%dT%H:%M:%S.%fZ")
			##next_date = upcoming_match["date"].strftime("%d %B %Y")

			out_message = "The weather forecast will be:\n{} and the temperature will be {} !!".format(weather_description,temperature)
			
			dispatcher.utter_message(out_message)

		return []