train nlu and core models
 1. rasa train 
 2. open new terminal 
 pip install rasa-sdk
 rasa run actions
 
 or
 python -m rasa_sdk --actions actions
 
 2. rasa run  --enable-api --cors “*” --endpoints endpoints.yml --log-file out.log