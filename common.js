/***************** Prototype *************************/
if(typeof String.prototype.trim !== 'function')
{
	String.prototype.trim = function()
	{
		return this.replace(/^\s+|\s+$/g, '');
	}
}
/******************************************/
function dw(str)
{
	document.write(str);
}
function getById(id)
{
	return document.getElementById(id);
}
function getByName(name)
{
	return document.getElementsByName(name)[0];
}
function getDigit(str, num) {
	i=1;
	if ( num != 1 ) {
		while (i!=num && str.length!=0) {
			if ( str.charAt(0) == '.' ) {
				i++;
			}
			str = str.substring(1);
		}
		if ( i!=num )
			return -1;
	}
	for (i=0; i<str.length; i++) {
		if ( str.charAt(i) == '.' ) {
			str = str.substring(0, i);
			break;
		}
	}
	if ( str.length == 0)
		return -1;
	d = parseInt(str, 10);
	return d;
}
function getBroadcastIP(ip, mask)
{
	var broadcastIP="";
	var ip_t=ip.split(".");
	var mask_t=mask.split(".");
	for(var i=0;i<4;i++){
		broadcastIP=broadcastIP+(ip_t[i] | (255-mask_t[i]));
		if(i!=3)
			broadcastIP=broadcastIP+'.';
	}
	return broadcastIP;
}
function isNumber(n)
{
	return !/[^0-9]/g.test(n)
}
function isBetween(n, min, max)
{
	return ((n <= max) & (n >= min))
}
function setfocus(target)
{
	target.value = target.defaultValue;
	target.focus();
}
function invalid(str)
{
	return String.format("Invalid value of %s!", str);
}
function isSubMask(mask)
{
	var submaskReg = /(^255.(0|128|192|224|24[08]|25[245]).0.0$)|(^255.255.(0|128|192|224|24[08]|25[245]).0$)|(^255.255.255.(0|128|192|224|24[08]|252)$)/;
	return submaskReg.test(mask);
}
function isIpaddr(ip)
{
	var IPRegEx = new RegExp("^(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]{1}\\d{1}|[1-9])\\.(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]{1}\\d{1}|\\d)\\.(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]{1}\\d{1}|\\d)\\.(25[0-4]|2[0-4]\\d|1\\d{2}|[1-9]{1}\\d{1}|[1-9])$");
	return IPRegEx.test(ip);
}
function isHostName(addr)
{
	var HOST_NAME_REGX =new RegExp("^([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}$");
	return HOST_NAME_REGX.test(addr);
}
function isEmail(email)
{
	var EMAIL_REGX = new RegExp("^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");
	return EMAIL_REGX.test(email);
}
function isBroadcastIp(ip, mask)
{
	mask = mask || "255.255.255.0";
	return (getBroadcastIP(ip, mask) == ip)
}
function isMulticast(ip)
{
	var MULTICAST_IP_REGX = new RegExp("^(22[4-9]|2[3-4][0-9]|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])$");
	return MULTICAST_IP_REGX.test(ip);
}
function hasSpecialChar(str)
{
	var SPECIAL_CHAR_REGX = new RegExp("[\\\\#'\"/:;&[ ]");
	return SPECIAL_CHAR_REGX.test(str);
}
function isRange(target, name, min, max)
{
	var ret = false;
	if(isNumber(target.value))
	{
		if(isBetween(target.value, min, max))
		{
			ret = true;
		}
		else
		{
			alert(String.format("Invalid value of %s! You should set a value between %s-%s.", name, min, max));
		}
	}
	else
	{
		alert(String.format("Invalid value of %s! It should be the decimal number (0-9).", name));
	}
	if(!ret)
	{
		setfocus(target);
	}
	return ret;
}
function isClockRange(val, name, min, max)
{
	if(isNaN(val))
	{
		alert(String.format("Invalid value of %s! It should be the decimal number (0-9).", name));
		return false;
	}
	if(!isBetween(val, min, max))
	{
		alert(String.format("Invalid value of %s! You should set a value between %s-%s.", name, min, max));
		return false;
	}
	return true;
}
function checkClientRange(start,end)
{
	var start_d, end_d;

	start_d=getDigit(start,4);
	start_d+=getDigit(start,3)*256;
	start_d+=getDigit(start,2)*256*256;
	start_d+=getDigit(start,1)*256*256*256;
	end_d=getDigit(end,4);
	end_d+=getDigit(end,3)*256;
	end_d+=getDigit(end,2)*256*256;
	end_d+=getDigit(end,1)*256*256*256;
	if(start_d<end_d)
		return true;
	return false;
}
function isSameSubnet(ip1,mask1,ip2,mask2)
{
	var ip1_t=ip1.split(".");
	var mask1_t=mask1.split(".");
	var ip2_t=ip2.split(".");
	if(typeof(mask2)!="undefined"){
		var mask2_t=mask2.split(".");	
		for(var i=0;i<4;i++)
		{
			if((parseInt(ip1_t[i]) & parseInt(mask1_t[i])) != (parseInt(ip2_t[i]) & parseInt(mask2_t[i])))
				return false;
		}
	}
	else{
		for(var i=0;i<4;i++)
		{
			if((parseInt(ip1_t[i]) & parseInt(mask1_t[i])) != (parseInt(ip2_t[i]) & parseInt(mask1_t[i])))
				return false;
		}
	}

	return true;
}
function isLinklocal(ip)
{
	return isSameSubnet("169.254.0.1", "255.255.0.0", ip);
}
function isLoopback(ip)
{
	return (ip == "127.0.0.1")
}
function htmlspecialchars(str)
{
	str = str || "";
	if(encodeURIComponent)
	{
		str = encodeURIComponent(str);
	}
	else if(escape)
	{
		str = escape(str);
	}
	else
	{
		str = str.replace(/\"/gi, '%22');
		str = str.replace("?", '%3F');
		str = str.replace("#", '%23');
		str = str.replace("&", '%26');
		str = str.replace(";", '%3B');
		str = str.replace("+", '%2B');
	}
	return str;
}

function showWMode(m)
{
	var mode = {"11ng":"B/G/N", "11bg":"B/G", "11b":"B", "11g":"G", "11n":"N", "11a":"A", "11ac":"N/AC", "11na":"A/N"};
	return "802.11 " + mode[m];
}
function showOpmode(s)
{
	var mode = {"sta":"Client Bridge", "wds_sta":"WDS Station", "ap":"Access Point", "wds_ap":"WDS Access Point", "wds_bridge":"WDS Bridge"};
	return mode[s];
}
function showBandwidth(b, disp)
{
	disp = disp || "";
	var band = {"HT20_40":((disp == "wireless_setting")?"20/40":"20-40"), "HT20":"20", "HT40":"40", "HT80":"80"};
	return band[b] + " MHz";
}
function showEncryption(e)
{
	var encryption = {"none":"None", "wep-shared":"WEP Shared", "wep-open":"WEP Open", "psk+tkip":"WPA/PSK TKIP", "psk+ccmp":"WPA/PSK AES", "psk+tkip+ccmp":"WPA/PSK TKIP+AES", "psk2+tkip":"WPA2/PSK TKIP", "psk2+ccmp":"WPA2/PSK AES", "psk2+tkip+ccmp":"WPA2/PSK TKIP+AES", "psk-mixed+tkip+ccmp":"WPA/WPA2-PSK TKIP+AES", "psk-mixed+tkip":"WPA/WPA2-PSK TKIP", "psk-mixed+ccmp":"WPA/WPA2-PSK AES", "wpa+tkip+ccmp":"WPA TKIP+AES", "wpa+tkip":"WPA TKIP", "wpa+ccmp":"WPA AES", "wpa2+tkip+ccmp":"WPA2 TKIP+AES", "wpa2+tkip":"WPA2 TKIP", "wpa2+ccmp":"WPA2 AES", "wpa-mixed+tkip+ccmp":"WPA/WPA2 TKIP+AES", "wpa-mixed+tkip":"WPA/WPA2 TKIP", "wpa-mixed+ccmp":"WPA/WPA2 AES"};
	return (encryption.hasOwnProperty(e))?encryption[e]:e;
}