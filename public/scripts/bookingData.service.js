var app = angular.module("Airbnb");

function bookingDataServiceFn($http) {

	var activeBooking = {};

	function setBooking(booking) {
		activeBooking.property = booking;
	}

	function getBooking() {
		return activeBooking;
	}

	function setBookingDates(bookingDates) {
		activeBooking.bookingDates = bookingDates;
	}

	function deleteBooking() {
		activeBooking = {};
	}
	
	
	return{
		setBooking:setBooking,
		getBooking:getBooking,
		setBookingDates:setBookingDates,
		deleteBooking:deleteBooking
	}
}

app.service("bookingDataService",bookingDataServiceFn);