<template lang="pug">
	section.world-weather(aria-labelledby="ww-title")
		h2#ww-title.sr-only {{$t('wwTitle')}}
		VueToggles(id="ww-toggle" :value="isChecked", @click="isChecked = !isChecked", checkedText="°F", uncheckedText="°C", height="30", width="52", checkedBg="#006b20", uncheckedBg="#ff2d00")
		p#lw-toggle-describe.sr-only {{$t('wwToggleDescription')}}
		template(v-if="worldData")
			carousel(:autoplay="true", :autoplayTimeout="3500", :autoplayHoverPause="true", :paginationEnabled="false", :perPage="1", :loop="true", aria-label="weather around the world")
				slide(v-for="(city, index) in worldData" :key="index")
					h3
						span.sr-only {{$t('wwWeatherIn')}}
						| {{ city.data.name }}
					.temperatures
						p.sr-only {{$t('wwMax')}}
						p.temp-max(v-if="isChecked") {{ city.data.main.temp_max | imperialTemperature }}&#176;
						p.temp-max(v-else) {{ city.data.main.temp_max | roundTemperature }}&#176;
						span.slash(aria-hidden="true") /
						p.sr-only {{$t('wwMin')}}
						p.temp-min(v-if="isChecked") {{ city.data.main.temp_min | imperialTemperature }}&#176;
						p.temp-min(v-else) {{ city.data.main.temp_min | roundTemperature }}&#176;
</template>
<script>
import axios from "axios";
import VueToggles from "vue-toggles";
import { Carousel, Slide } from "vue-carousel";
import unitConvert from "../mixins/unit-convert";
import messages from "./i18n/lang.json";

export default {
	name: "LocalWeather",
	components: {
		VueToggles,
		Carousel,
		Slide
	},
	mixins: [ unitConvert ],
	data() {
		return {
			isChecked: false,
			worldData: {}
		}
	},
	props: {
		cities: {
			type: Array,
			required: true
		}
	},
	created() {
		const citiesArray = this.cities.map(
			(city) =>
				`https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${process.env.VUE_APP_API_KEY}&units=metric`
		)
		axios
			.all(citiesArray.map((city) => axios.get(city)))
			.then((response) => (this.worldData = response))
			.catch((error) => console.log("error get data:", error));

	},
	i18n: { messages }
};
</script>
<style scoped lang="scss">
@import "../common/css/variables.scss";

.world-weather {
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
}

.VueCarousel {
	width: 100%;
}

.VueCarousel h3,
.VueCarousel img {
	text-align: center;
}

.VueCarousel .temperatures {
	align-content: center;
	display: flex;
	font-weight: bold;
	justify-content: center;
}

.VueCarousel .temp-max {
	font-size: 50px;
}

.VueCarousel .slash {
	font-size: 45px;
	margin: 0 15px;
}

.VueCarousel .temp-min {
	color: $gray-62;
	font-size: 50px;
}
</style>
