$(document).ready(function () {
	var num = 1;
	$("button").attr("disabled", true)
	$("#btnConnect").attr("disabled", false)
	$("input").attr("disabled", true)
	$("#brokerAddress").attr("disabled", false)
	$("#btnConnect").click(function () {
		let address = $("#brokerAddress").val()
		client = mqtt.connect(address)
		$("#status").text("Connecting.....")
		$("#status").css("color", "rgb(230, 230, 0)")
		client.on("connect", function () {
			$("button").attr("disabled", false)
			$("input").attr("disabled", false)
			$("#status").css("color", "green")
			$("#status").text("Successfully connected!");
		});
		client.on("message", function (topic, payload) {
			var stamp = new Date($.now());
			console.log("message");
			let idn = "#tbodyContainer .content" + num;
			num += 1;
			$(idn).before($("<tr class="+"content"+num+"><th>" + topic + "</th><td>" + payload + "</td><td>" + stamp.toString().slice(0, 24) + "</td></tr>"));			
		});
	});
	$("#btnDisconnect").click(function () {
		client.end();
		$("#status").css("color", "red")
		$("#status").text("Disconnected!")
		$("button").attr("disabled", true)
		$("#btnConnect").attr("disabled", false)
		$("input").attr("disabled", true)
		$("#brokerAddress").attr("disabled", false)
	});	
	$("#btnSubscribe").click(function () {
		client.subscribe($("#topicToSubscribe").val());
	});
	$("#btnPublish").click(function () {
		client.publish($("#topicToPublish").val(), $("#payloadToPublish").val());
	});
	$("#btnUnsubscribe").click(function () {
		client.unsubscribe($("#topicToSubscribe").val());
	});
	$("#clearsms").click(function(){
		$("#tbodyContainer").empty();
	});
});