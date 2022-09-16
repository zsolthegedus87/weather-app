<template lang="pug">
	section.local-weather(aria-labelledby="lw-title")
		h2#lw-title.sr-only {{$t('lwTitle')}}
		VueToggles(id="lw-toggle" :value="isChecked", @click="isChecked = !isChecked", checkedText="°F", uncheckedText="°C", height="30", width="52", checkedBg="#006b20", uncheckedBg="#ff2d00", aria-describedby="")
		p#lw-toggle-describe.sr-only {{$t('lwToggleDescription')}}
		template(v-if="localData")
			.local-weather-present(:aria-label="$t('lwPresentLabel')")
				h3 {{ localData.timezone }}
				p.local-weather-present__temp(v-if="isChecked") {{ localData.current.temp | imperialTemperature }}&#176;
				p.local-weather-present__temp(v-else) {{ localData.current.temp | roundTemperature }}&#176;

			ul.local-weather-weekly(:aria-label="$t('lwWeeklyLabel')")
				li(v-for="(day, index) in filteredDaily" :key="index")
					p {{ getDayName(day.dt) }}
					img(alt="", :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`")
					p(v-if="isChecked") {{ day.temp.max | imperialTemperature }}&#176; / {{ day.temp.min | imperialTemperature }}&#176;
					p(v-else) {{ day.temp.max | roundTemperature }}&#176; / {{ day.temp.min | roundTemperature }}&#176;

			ul.local-weather-hourly(:aria-label="$t('lwHourlyLabel')")
				li(v-for="(hour, index) in filteredHourly" :key="index")
					p {{ hour.dt | getHourNumber }}
					img(alt="", :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`")
					p(v-if="isChecked") {{ hour.temp | imperialTemperature }}&#176;
					p(v-else) {{ hour.temp | roundTemperature }}&#176;

		.state.state--error(v-if='errorStr')
			| Sorry, but the following error
			| occurred: {{ errorStr }}
		.state.state--loading(v-if='gettingLocation')
			i {{$t('gettingLocation')}}
</template>
<script>
import axios from "axios";
import VueToggles from "vue-toggles";
import unitConvert from "../mixins/unit-convert";
import messages from "./i18n/lang.json";

export default {
	name: "LocalWeather",
	components: {
		VueToggles
	},
	mixins: [ unitConvert ],
	data() {
		return {
			location: null,
			isChecked: false,
			gettingLocation: false,
			errorStr: null,
			localData: null,
			days: this.$t("wwTitle"),
		}
	},
	created() {
		if (!("geolocation" in navigator)) {
			this.errorStr = "Geolocation is not available.";
			return;
		}
		this.gettingLocation = true;
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				this.gettingLocation = false;
				this.location = pos;
			},
			(err) => {
				this.gettingLocation = false;
				this.errorStr = err.message;
			}
		);
	},
	watch: {
		location: {
			handler() {
				axios
					.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${this.location.coords.latitude}&lon=${this.location.coords.longitude}&appid=${process.env.VUE_APP_API_KEY}&units=metric&exclude={part}`
					)
					.then((response) => (this.localData = response.data))
					.catch((error) => console.log("error get data:", error));
			},
		}
	},
	filters: {
		getHourNumber: function (timestamp) {
			var date = new Date(timestamp * 1000);

			return date.getHours() + ":00";
		}
	},
	computed: {
		filteredDaily() {
			return this.localData.daily.slice(1, -1);
		},
		filteredHourly() {
			return this.localData.hourly.slice(1, 13);
		},
	},
	methods: {
		getDayName(timestamp) {
			let a = new Date(timestamp * 1000);
			let days = this.$t("days").split(",");

			return days[a.getDay()];
		},
	},
	i18n: { messages }
};
</script>
<style scoped lang="scss">
@import "../common/css/variables.scss";

.local-weather {
	height: 100%;
}

.local-weather-present__temp {
	font-size: 28px;
	font-weight: bold;
}

.local-weather-weekly {
	align-content: center;
	display: flex;
	justify-content: space-between;
	text-align: center;
}

.local-weather-hourly li {
	align-items: center;
	display: flex;
	justify-content: space-between;
	width: 100%;

	&:not(:last-of-type) {
		border-bottom: 1px solid $gray-eb;
	}
}

.local-weather-hourly li img {
	height: 50px;
	width: 50px;
}

.local-weather-weekly {
	margin: 8px 0;
	padding: 8px 0;
	list-style: none;
	border-bottom: 1px solid $gray-08;
	border-top: 1px solid $gray-08;
	flex-wrap: wrap;

	@media (min-width: $desktop-width) {
		flex-wrap: nowrap;
	}
}

.local-weather-weekly li {
	flex: 0 0 33.333333%;
	padding: 6px 0;

	@media (min-width: $desktop-width) {
		padding: 0;
		flex: auto;
	}
}

.local-weather-weekly img {
	height: 50px;
	width: 50px;
}
</style>
