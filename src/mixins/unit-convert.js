export default {
	filters: {
		roundTemperature: function(temp) {
			return Math.round(temp);
		},
		imperialTemperature: function(temp) {
			return Math.round((temp * 9) / 5 + 32);
		}
	}
}
