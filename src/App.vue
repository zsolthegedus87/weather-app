<template lang="pug">
	#app(v-cloak)
		main.container(role='main')
			h1.sr-only Weather App
			.row
				.col
					.card
						LocalWeather
				.col
					.card
						WorldWeather(:cities="[2655984, 703448, 1850147, 2147714, 524894]")
</template>
<script>
import LocalWeather from "./components/LocalWeather";
import WorldWeather from "./components/WorldWeather";

export default {
	name: "App",
	components: {
		LocalWeather,
		WorldWeather
	},
};
</script>
<style lang="scss">
@import "common/css/main.scss";

[v-cloak] {
	display: none;
}

.card {
	border: 1px solid #f0f0f0;
	border-radius: 8px;
	box-shadow: 0 4px 8px -2px rgb(0 0 0 / 24%);
	height: 100%;
	min-height: 230px;
	padding: 16px;
	position: relative;
	overflow: hidden;
}

.card .vue-toggles {
	position: absolute;
	top: 16px;
	right: 16px;
}
</style>
