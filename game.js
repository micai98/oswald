/*********************************************
 * Tululoo Game Maker v1.3.0
 *
 * Creators 
 * Zoltan Percsich
 * Vadim "YellowAfterlife" Dyachenko
 *
 * (c) SilentWorks 2011 - 2013
 * All rights reserved.
 * www.tululoo.com
 *
 * Contributors:
 * Csaba Herbut
 ********************************************/

function tu_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	tu_gameloop = tu_canvas = tu_context = tu_room_to_go = null, tu_canvas_id = 'tululoocanvas',
	tu_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	tu_loading = tu_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	tu_sprites = [], tu_audios = [], tu_backgrounds = [], tu_fonts = [], tu_scenes = [],
	// time:
	tu_frame_time = tu_frame_step = tu_frame_el = tu_frame_count = tu_elapsed = 0,
	tu_prev_cycle_time = tu_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], tu_vkeys = [],
	tu_keys_pressed = [], tu_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	tu_unpausekey = 27, tu_paused = false, tu_modal = null, tu_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	tu_tiles = [], tu_tilesi = [], tu_tilez = 256,
	// sound variables:
	tu_wav_supported = tu_detect_audio('audio/wav; codecs="1"'),
	tu_ogg_supported = tu_detect_audio('audio/ogg; codecs="vorbis"'),
	tu_mp3_supported = tu_detect_audio('audio/mpeg;'),
	// drawing:
	tu_draw_alpha = 1, tu_draw_color_red = tu_draw_color_green = tu_draw_color_blue = 0,
	tu_draw_font = "Arial 12px", tu_draw_halign = "left", tu_draw_valign = "top",
	tu_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	tu_draw_color = "rgb(" + tu_draw_color_red + "," + 
	tu_draw_color_green + "," + tu_draw_color_blue + ")", 
	tu_redraw, tu_redraw_auto = true,
	tu_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	tu_depth = [], tu_depthi = [], tu_depthu = [], tu_types = [], tu_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	tu_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function tu_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!tu_wav_supported) return; break;
	case "ogg": if (!tu_ogg_supported) return; break;
	case "mp3": if (!tu_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < tu_audios.length; _s++) sound_stop( tu_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	tu_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	tu_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.rotate(degtorad(_rotation));
	tu_context.scale(_xscale, _yscale);
	tu_context.globalAlpha = _alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	tu_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	if (_outline) tu_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else tu_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	tu_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, tu_2pi, true );
	tu_context.closePath();
	!_outline ? tu_context.fill() : tu_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	tu_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	tu_context.closePath();
	tu_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	tu_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	tu_draw_color_red = _r;
	tu_draw_color_green = _g;
	tu_draw_color_blue = _b;
	tu_draw_color = tu_draw_color_red + "," + tu_draw_color_green + "," + tu_draw_color_blue;
	tu_context.fillStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.strokeStyle = "rgb(" + tu_draw_color + ")";
}
function draw_set_linewidth(_width) { tu_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	tu_draw_font_ = _font;
	tu_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
}
function draw_set_halign(_halign) { tu_draw_halign = _halign; }
function draw_set_valign(_valign) { tu_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	tu_viewport_inst = null;
	tu_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri + 1)] == "object") room_goto(tu_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri - 1)] == "object") room_goto(tu_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(tu_scenes[0]); }
function room_goto_last() { room_goto(tu_scenes[(tu_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	tu_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	tu_paused = true;
	tu_unpausekey = _key;
}
function modal_end() {
	if (tu_modal == null) return;
	tu_modal.instance_destroy();
	tu_modal = null;
}
function modal_start(_inst, _draw) {
	if (tu_modal != null) modal_end();
	tu_modal = _inst;
	tu_modaldraw = _draw;
}
//
function show_mouse() { tu_canvas.style.cursor = "default"; }
function hide_mouse() { tu_canvas.style.cursor = "none"; }
//
function tu_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function tu_global () { }
global = new tu_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		tu_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = tu_canvas.offsetLeft + _x;
	r[0].pageY = tu_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= tu_canvas.offsetLeft;
		mouse_y -= tu_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = tu_vkeys.length, _i, _j, _c, _k,
		_dx = tu_canvas.offsetLeft, _dy = tu_canvas.offsetTop, _mx = _my = 1;
	if (tu_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) tu_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!tu_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > tu_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < tu_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < tu_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > tu_vkeys[_j].bottom) continue;
			tu_vkeys[_j].count++;
			if (!tu_vkeys[_j].down) {
				tu_vkeys[_j].down = true;
				_k = tu_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					tu_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (tu_vkeys[_i].count != 0) continue;
		if (!tu_vkeys[_i].down) continue;
		tu_vkeys[_i].down = false;
		_k = tu_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			tu_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function tu_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function tu_loading_inc() { tu_loading++; tu_load_total++; }
function tu_loading_dec() { tu_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _tu_depth_find(_d) {
	var _tl = tu_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _tu_depth_new(_d) {
	var _i = _tu_depth_find(_d), _o = [];
	tu_depth.splice(_i, 0, _o);
	tu_depthi.splice(_i, 0, _d);
	return _i;
}
function tu_depth_add(_d, _o) {
	var _t = tu_depthi.indexOf(_d);
	if (_t == -1) _t = _tu_depth_new(_d); // create array if none
	tu_depth[_t].push(_o);
}
function tu_depth_delete(_d, _o) {
	var _t = tu_depth[tu_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function tu_depth_update() {
	var i, l = tu_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = tu_depthu[i];
		if (o.instance_active && o._depth !== undefined) tu_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) tu_depth_add(o._depth, o);
		o._depthu = false;
	}
	tu_depthu = [];
}
// Accessors:
function tu_depth_get() { return this._depth; }
function tu_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	tu_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (tu_types[_t] == undefined) tu_types[_t] = [];
	return tu_types[_t];
}
function tu_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function tu_type_delete(_o, _p) {
	var _d = tu_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function tu_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = tu_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	tu_tiles.splice(_i, 0, _o);
	tu_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / tu_tilez),
		_ty1 = Math.floor(_y / tu_tilez),
		_tx2 = Math.floor((_x + _w) / tu_tilez),
		_ty2 = Math.floor((_y + _h) / tu_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = tu_tilesi.indexOf(_z);
	if (_e != -1) _d = tu_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = tu_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = tu_tiles[_ti];
	_tx1 = Math.floor(_x / tu_tilez);
	_ty1 = Math.floor(_y / tu_tilez);
	_tx2 = Math.floor((_x + _w) / tu_tilez);
	_ty2 = Math.floor((_y + _h) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		tu_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / tu_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / tu_tilez),
		_ty1 = Math.floor(room_viewport_y / tu_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function tu_id_get() { return this; }
function tu_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', tu_depth_get, tu_depth_set );
	var_override(_this, 'object_index', tu_type_get, tu_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', tu_id_get, tu_idle);
	var_override(_this, 'parent', tu_parent_get, tu_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			tu_loading_inc();
			_frame.onload = tu_loading_dec;
			_frame.onerror = tu_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	tu_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (tu_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (tu_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (tu_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	tu_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	tu_loading_inc();
	_this.image.onload = tu_loading_dec;
	_this.image.onerror = tu_loading_dec;
	_this.image.src = _file;
	tu_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	tu_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = "Loading resources: " + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	tu_context.font = "italic 12px Verdana";
	tu_context.textAlign = "left";
	tu_context.textBaseline = "bottom";
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(192, 192, 192, 1)";
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(0, 0, 0, 1)";
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(255, 255, 255, 1)";
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	tu_context.fillText(_s, _x, _y - 2);
}

function tu_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		tu_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	tu_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_add(o, _i);
	//tu_type_add(_i._object_index, _i);
	//if (_i.parent != null) tu_type_add(_i.parent, _i);
	tu_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_delete(o._object_index_, _i);
	//tu_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) tu_type_delete(_i, _i.parent._object_index_);
	tu_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in tu_depth) {
		_l = tu_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = tu_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function tu_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	tu_persist.push(_o);
	instance_deactivate(_o);
}
function tu_room_switchto(_dest) {
	tu_persist = [];
	instance_foreach(tu_room_switchto_);
	room_current = _dest;
	tu_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function tu_step() {
	// object step events:
	tu_trash = [];
	var tu_deptho, tu_depthl, _obj_, _objd_, _h, _v;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			// is viewport object?
			if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				tu_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * tu_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (tu_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function tu_draw() {
	// clear canvas:
	if (room_background_color_show) {
		tu_canvas.width = tu_canvas.width;
		tu_canvas.height = tu_canvas.height;
		// set background color:
		tu_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	tu_render_back();
	tile_layer_last = 0;
	var tu_depthc, tu_depthv, tu_deptho, tu_depthl, _obj_;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthv = tu_depthi[tu_depthd];
		for (; tu_tilesi[tile_layer_last] >= tu_depthv && tile_layer_last < tu_tiles.length; tile_layer_last++)
		{
			tile_lrender(tu_tiles[tile_layer_last]);
		}
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < tu_tiles.length; tile_layer_last++) {
		tile_lrender(tu_tiles[tile_layer_last]);
	}
}

function tu_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < tu_keys_pressed.length; _k++) key_pressed[tu_keys_pressed[_k]] = false;
	for (_k = 0; _k < tu_keys_released.length; _k++) key_released[tu_keys_released[_k]] = false;
	tu_keys_pressed = [];
	tu_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < tu_trash.length; _r++) {
		_obj_ = tu_trash[_r];
		if (tu_modal == _obj_) tu_modal = null;
		_obj_.depth = undefined;
		tu_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) tu_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function tu_loop() {
	// calculate render time
	tu_frame_time = tu_gettime();
	tu_elapsed = (tu_frame_time - tu_prev_frame_time);
	tu_frame_step += tu_elapsed;
	tu_frame_el += tu_elapsed;
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_frame_step >= 1000 / room_speed && tu_loading == 0 && tu_canvas != null && !tu_paused) {
		tu_frame_count++;
		tu_elapsed = tu_frame_time - tu_prev_cycle_time;
		tu_prev_cycle_time = tu_frame_time;
		tu_frame_step -= 1000 / room_speed;
		if (tu_frame_step < 0 || tu_frame_step > 1024) tu_frame_step = 0;
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		//
		tu_redraw = tu_redraw_auto;
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else tu_step();
		tu_depth_update();
		if (tu_redraw) {
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// calculate fps:
	if (tu_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(tu_frame_count * 1000 / tu_frame_el);
		if (fps > room_speed) fps = room_speed;
		tu_frame_el = tu_frame_count = 0;
	}
	// repeat
	tu_prev_frame_time = tu_frame_time;
	setTimeout(tu_gameloop, 5);
}
tu_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/
/* keyboard_string by micai */

var keyboard_string = "";

function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
		keyboard_string = keyboard_string.concat(String.fromCharCode(keyCode));
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};


/* custom_loading_screen by micai */

var tu_preloader_showtext = true;
var tu_preloader_text = "Loading resources: ";
var tu_preloader_bgcolor = "rgb(42, 42, 42)";
var tu_preloader_font = "italic 12px Verdana";
var tu_preloader_textalign = "left";
var tu_preloader_textbaseline = "bottom";

var tu_preloader_barstroke = "rgba(192, 192, 192, 1)";
var tu_preloader_barbg = "rgba(0, 0, 0, 1)";
var tu_preloader_barfill = "rgba(255, 255, 255, 1)";


function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = tu_preloader_text + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = tu_preloader_bgcolor;
	tu_context.font = tu_preloader_font;
	tu_context.textAlign = tu_preloader_textalign;
	tu_context.textBaseline = tu_preloader_textbaseline;
	tu_context.fillStyle = tu_context.strokeStyle = tu_preloader_barstroke;
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = tu_preloader_barbg;
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = tu_preloader_barfill;
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	if (tu_preloader_showtext) tu_context.fillText(_s, _x, _y - 2);
}




/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __col_kot() { 
__sprite_init__(this, col_kot, 16, 22, 8, 11, 'Box', 8, 3, 13, 5, 22, ['img/col_kot_0.png']);
}; var col_kot = new __col_kot();

function __col_16x() { 
__sprite_init__(this, col_16x, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/col_16x_0.png']);
}; var col_16x = new __col_16x();

function __s_kot() { 
__sprite_init__(this, s_kot, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_0.png','img/s_kot_1.png','img/s_kot_2.png','img/s_kot_3.png']);
}; var s_kot = new __s_kot();

function __s_ground() { 
__sprite_init__(this, s_ground, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_ground_2.png']);
}; var s_ground = new __s_ground();

function __s_dev_camera() { 
__sprite_init__(this, s_dev_camera, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_dev_camera_0.png']);
}; var s_dev_camera = new __s_dev_camera();

function __s_dev_cube() { 
__sprite_init__(this, s_dev_cube, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_dev_cube_0.png']);
}; var s_dev_cube = new __s_dev_cube();

function __s_font() { 
__sprite_init__(this, s_font, 8, 8, 0, 0, 'Box', 4, 0, 8, 0, 8, ['img/s_font_0.png','img/s_font_1.png','img/s_font_2.png','img/s_font_3.png','img/s_font_4.png','img/s_font_5.png','img/s_font_6.png','img/s_font_7.png','img/s_font_8.png','img/s_font_9.png','img/s_font_10.png','img/s_font_11.png','img/s_font_12.png','img/s_font_13.png','img/s_font_14.png','img/s_font_15.png','img/s_font_16.png','img/s_font_17.png','img/s_font_18.png','img/s_font_19.png','img/s_font_20.png','img/s_font_21.png','img/s_font_22.png','img/s_font_23.png','img/s_font_24.png','img/s_font_25.png','img/s_font_26.png','img/s_font_27.png','img/s_font_28.png','img/s_font_29.png','img/s_font_30.png','img/s_font_31.png','img/s_font_32.png','img/s_font_33.png','img/s_font_34.png','img/s_font_35.png','img/s_font_36.png','img/s_font_37.png','img/s_font_38.png','img/s_font_39.png','img/s_font_40.png','img/s_font_41.png','img/s_font_42.png','img/s_font_43.png','img/s_font_44.png','img/s_font_45.png','img/s_font_46.png','img/s_font_47.png','img/s_font_48.png','img/s_font_49.png','img/s_font_50.png','img/s_font_51.png','img/s_font_52.png','img/s_font_53.png','img/s_font_54.png','img/s_font_55.png','img/s_font_56.png','img/s_font_57.png','img/s_font_58.png','img/s_font_59.png','img/s_font_60.png','img/s_font_61.png','img/s_font_62.png','img/s_font_63.png','img/s_font_64.png','img/s_font_65.png','img/s_font_66.png','img/s_font_67.png','img/s_font_68.png','img/s_font_69.png','img/s_font_70.png','img/s_font_71.png','img/s_font_72.png','img/s_font_73.png','img/s_font_74.png','img/s_font_75.png','img/s_font_76.png','img/s_font_77.png','img/s_font_78.png','img/s_font_79.png','img/s_font_80.png','img/s_font_81.png','img/s_font_82.png','img/s_font_83.png','img/s_font_84.png','img/s_font_85.png','img/s_font_86.png','img/s_font_87.png','img/s_font_88.png','img/s_font_89.png','img/s_font_90.png','img/s_font_91.png','img/s_font_92.png','img/s_font_93.png','img/s_font_94.png']);
}; var s_font = new __s_font();

function __s_spikes() { 
__sprite_init__(this, s_spikes, 16, 16, 0, 0, 'Box', 8, 4, 12, 4, 12, ['img/s_spikes_0.png','img/s_spikes_1.png','img/s_spikes_2.png','img/s_spikes_3.png']);
}; var s_spikes = new __s_spikes();

function __s_kot_sak_old() { 
__sprite_init__(this, s_kot_sak_old, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_sak_old_0.png','img/s_kot_sak_old_1.png','img/s_kot_sak_old_2.png','img/s_kot_sak_old_3.png']);
}; var s_kot_sak_old = new __s_kot_sak_old();

function __s_kot_tall() { 
__sprite_init__(this, s_kot_tall, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_tall_0.png','img/s_kot_tall_1.png','img/s_kot_tall_2.png','img/s_kot_tall_3.png']);
}; var s_kot_tall = new __s_kot_tall();

function __s_kot_fat() { 
__sprite_init__(this, s_kot_fat, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_fat_0.png','img/s_kot_fat_1.png','img/s_kot_fat_2.png','img/s_kot_fat_3.png']);
}; var s_kot_fat = new __s_kot_fat();

function __s_kot_sak() { 
__sprite_init__(this, s_kot_sak, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_sak_0.png','img/s_kot_sak_1.png','img/s_kot_sak_2.png','img/s_kot_sak_3.png']);
}; var s_kot_sak = new __s_kot_sak();

function __s_dev_no() { 
__sprite_init__(this, s_dev_no, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_dev_no_0.png']);
}; var s_dev_no = new __s_dev_no();

function __s_brick() { 
__sprite_init__(this, s_brick, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_brick_5.png']);
}; var s_brick = new __s_brick();

function __s_cloud() { 
__sprite_init__(this, s_cloud, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_cloud_2.png']);
}; var s_cloud = new __s_cloud();

function __s_coin() { 
__sprite_init__(this, s_coin, 16, 16, 0, 0, 'Box', 8, 2, 14, 2, 14, ['img/s_coin_0.png','img/s_coin_1.png','img/s_coin_2.png','img/s_coin_3.png','img/s_coin_4.png','img/s_coin_5.png','img/s_coin_6.png','img/s_coin_7.png','img/s_coin_8.png','img/s_coin_9.png','img/s_coin_10.png','img/s_coin_11.png']);
}; var s_coin = new __s_coin();

function __s_enemy_rat() { 
__sprite_init__(this, s_enemy_rat, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_enemy_rat_0.png','img/s_enemy_rat_1.png','img/s_enemy_rat_2.png','img/s_enemy_rat_3.png']);
}; var s_enemy_rat = new __s_enemy_rat();

function __s_enemy_rat_dead() { 
__sprite_init__(this, s_enemy_rat_dead, 16, 22, 8, 11, 'Box', 8, 1, 15, 17, 22, ['img/s_enemy_rat_dead_0.png']);
}; var s_enemy_rat_dead = new __s_enemy_rat_dead();

function __s_dev_unknown() { 
__sprite_init__(this, s_dev_unknown, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_dev_unknown_0.png']);
}; var s_dev_unknown = new __s_dev_unknown();

function __s_woodenblock() { 
__sprite_init__(this, s_woodenblock, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_woodenblock_0.png']);
}; var s_woodenblock = new __s_woodenblock();

function __s_trampoline() { 
__sprite_init__(this, s_trampoline, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_trampoline_0.png','img/s_trampoline_1.png','img/s_trampoline_2.png','img/s_trampoline_3.png']);
}; var s_trampoline = new __s_trampoline();

function __s_kot_girl() { 
__sprite_init__(this, s_kot_girl, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_girl_0.png','img/s_kot_girl_1.png','img/s_kot_girl_2.png','img/s_kot_girl_3.png']);
}; var s_kot_girl = new __s_kot_girl();

function __s_kot_hat() { 
__sprite_init__(this, s_kot_hat, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_hat_0.png','img/s_kot_hat_1.png','img/s_kot_hat_2.png','img/s_kot_hat_3.png']);
}; var s_kot_hat = new __s_kot_hat();

function __s_mobc_l() { 
__sprite_init__(this, s_mobc_l, 48, 48, 0, 0, 'Box', 24, 0, 48, 0, 48, ['img/s_mobc_l_0.png']);
}; var s_mobc_l = new __s_mobc_l();

function __s_mobc_r() { 
__sprite_init__(this, s_mobc_r, 48, 48, 0, 0, 'Box', 24, 0, 48, 0, 48, ['img/s_mobc_r_0.png']);
}; var s_mobc_r = new __s_mobc_r();

function __s_mobc_u() { 
__sprite_init__(this, s_mobc_u, 48, 48, 0, 0, 'Box', 24, 0, 48, 0, 48, ['img/s_mobc_u_0.png']);
}; var s_mobc_u = new __s_mobc_u();

function __s_mobc_p() { 
__sprite_init__(this, s_mobc_p, 48, 48, 0, 0, 'Box', 24, 0, 48, 0, 48, ['img/s_mobc_p_0.png']);
}; var s_mobc_p = new __s_mobc_p();

function __s_kot_agent() { 
__sprite_init__(this, s_kot_agent, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_agent_0.png','img/s_kot_agent_1.png','img/s_kot_agent_2.png','img/s_kot_agent_3.png']);
}; var s_kot_agent = new __s_kot_agent();

function __s_kot_soup() { 
__sprite_init__(this, s_kot_soup, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_soup_0.png','img/s_kot_soup_1.png','img/s_kot_soup_2.png','img/s_kot_soup_3.png']);
}; var s_kot_soup = new __s_kot_soup();

function __s_debug_line() { 
__sprite_init__(this, s_debug_line, 1, 160, 0, 0, 'Box', 0, 0, 1, 0, 160, ['img/s_debug_line_0.png']);
}; var s_debug_line = new __s_debug_line();

function __s_heli() { 
__sprite_init__(this, s_heli, 32, 32, 16, 11, 'Box', 16, 9, 23, 17, 28, ['img/s_heli_0.png','img/s_heli_1.png','img/s_heli_2.png','img/s_heli_3.png','img/s_heli_4.png','img/s_heli_5.png','img/s_heli_6.png']);
}; var s_heli = new __s_heli();

function __s_sign_noheli() { 
__sprite_init__(this, s_sign_noheli, 64, 64, 0, 48, 'Box', 32, 0, 64, 0, 64, ['img/s_sign_noheli_0.png']);
}; var s_sign_noheli = new __s_sign_noheli();

function __s_kot_burnt() { 
__sprite_init__(this, s_kot_burnt, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_burnt_0.png','img/s_kot_burnt_1.png','img/s_kot_burnt_2.png','img/s_kot_burnt_3.png']);
}; var s_kot_burnt = new __s_kot_burnt();

function __s_dev_fill50() { 
__sprite_init__(this, s_dev_fill50, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_dev_fill50_0.png']);
}; var s_dev_fill50 = new __s_dev_fill50();

function __s_enemy_cactus() { 
__sprite_init__(this, s_enemy_cactus, 16, 16, 0, 0, 'Box', 8, 3, 13, 3, 13, ['img/s_enemy_cactus_0.png','img/s_enemy_cactus_1.png']);
}; var s_enemy_cactus = new __s_enemy_cactus();

function __s_enemy_crusher() { 
__sprite_init__(this, s_enemy_crusher, 32, 160, 0, 144, 'Box', 16, 5, 27, 0, 155, ['img/s_enemy_crusher_0.png']);
}; var s_enemy_crusher = new __s_enemy_crusher();

function __s_enemy_missile() { 
__sprite_init__(this, s_enemy_missile, 16, 16, 8, 8, 'Box', 8, 1, 15, 1, 15, ['img/s_enemy_missile_0.png']);
}; var s_enemy_missile = new __s_enemy_missile();

function __s_platform() { 
__sprite_init__(this, s_platform, 32, 16, 0, 0, 'Box', 16, 0, 32, 0, 16, ['img/s_platform_0.png']);
}; var s_platform = new __s_platform();

function __s_enemy_rathuge() { 
__sprite_init__(this, s_enemy_rathuge, 32, 44, 16, 22, 'Box', 16, 6, 26, 16, 44, ['img/s_enemy_rathuge_0.png','img/s_enemy_rathuge_1.png','img/s_enemy_rathuge_2.png','img/s_enemy_rathuge_3.png']);
}; var s_enemy_rathuge = new __s_enemy_rathuge();

function __s_enemy_rathuge_dead() { 
__sprite_init__(this, s_enemy_rathuge_dead, 32, 44, 16, 22, 'Box', 16, 6, 26, 32, 44, ['img/s_enemy_rathuge_dead_0.png']);
}; var s_enemy_rathuge_dead = new __s_enemy_rathuge_dead();

function __col_32x() { 
__sprite_init__(this, col_32x, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/col_32x_0.png']);
}; var col_32x = new __col_32x();

function __s_kot_troll() { 
__sprite_init__(this, s_kot_troll, 16, 22, 8, 11, 'Box', 8, 3, 13, 8, 22, ['img/s_kot_troll_0.png','img/s_kot_troll_1.png','img/s_kot_troll_2.png','img/s_kot_troll_3.png']);
}; var s_kot_troll = new __s_kot_troll();

function __s_conveyor_l() { 
__sprite_init__(this, s_conveyor_l, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_conveyor_l_0.png','img/s_conveyor_l_1.png']);
}; var s_conveyor_l = new __s_conveyor_l();

function __s_conveyor_m() { 
__sprite_init__(this, s_conveyor_m, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_conveyor_m_0.png','img/s_conveyor_m_1.png']);
}; var s_conveyor_m = new __s_conveyor_m();

function __s_conveyor_r() { 
__sprite_init__(this, s_conveyor_r, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/s_conveyor_r_0.png','img/s_conveyor_r_1.png']);
}; var s_conveyor_r = new __s_conveyor_r();

function __s_enemy_ratheli() { 
__sprite_init__(this, s_enemy_ratheli, 32, 32, 16, 16, 'Box', 16, 9, 23, 8, 24, ['img/s_enemy_ratheli_0.png','img/s_enemy_ratheli_1.png','img/s_enemy_ratheli_2.png','img/s_enemy_ratheli_3.png','img/s_enemy_ratheli_4.png','img/s_enemy_ratheli_5.png','img/s_enemy_ratheli_6.png']);
}; var s_enemy_ratheli = new __s_enemy_ratheli();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __snd_jump() { 
__audio_init__(this, snd_jump, '', '', 'aud/jump.ogg');
}; var snd_jump = new __snd_jump();

function __snd_coin() { 
__audio_init__(this, snd_coin, '', '', 'aud/coin.ogg');
}; var snd_coin = new __snd_coin();

function __snd_stomp() { 
__audio_init__(this, snd_stomp, '', '', 'aud/stomp.ogg');
}; var snd_stomp = new __snd_stomp();

function __snd_dead() { 
__audio_init__(this, snd_dead, '', '', 'aud/dead.ogg');
}; var snd_dead = new __snd_dead();

function __snd_trampoline() { 
__audio_init__(this, snd_trampoline, '', '', 'aud/trampoline.ogg');
}; var snd_trampoline = new __snd_trampoline();

function __snd_pause() { 
__audio_init__(this, snd_pause, '', '', 'aud/pause.ogg');
}; var snd_pause = new __snd_pause();

function __snd_bump() { 
__audio_init__(this, snd_bump, '', '', 'aud/bump.ogg');
}; var snd_bump = new __snd_bump();

function __snd_float() { 
__audio_init__(this, snd_float, '', '', 'aud/float.ogg');
}; var snd_float = new __snd_float();

function __snd_bong() { 
__audio_init__(this, snd_bong, '', '', 'aud/bong.ogg');
}; var snd_bong = new __snd_bong();

function __snd_vehicledie() { 
__audio_init__(this, snd_vehicledie, '', '', 'aud/vehicledie.ogg');
}; var snd_vehicledie = new __snd_vehicledie();

function __snd_thump() { 
__audio_init__(this, snd_thump, '', '', 'aud/thump.ogg');
}; var snd_thump = new __snd_thump();

function __snd_missile() { 
__audio_init__(this, snd_missile, '', '', 'aud/missile.ogg');
}; var snd_missile = new __snd_missile();

function __snd_bigheadhit() { 
__audio_init__(this, snd_bigheadhit, '', '', 'aud/big_head_hit.ogg');
}; var snd_bigheadhit = new __snd_bigheadhit();



/***********************************************************************
 * MUSICS
 ***********************************************************************/


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/
function __ts_ground() { 
__background_init__(this, ts_ground, 'img/ts_ground_mono_strip16.png')}; var ts_ground = new __ts_ground();

function __ts_brick() { 
__background_init__(this, ts_brick, 'img/s_brick_mono_detail_strip16.png')}; var ts_brick = new __ts_brick();

function __ts_cloud() { 
__background_init__(this, ts_cloud, 'img/s_cloud_mono.png')}; var ts_cloud = new __ts_cloud();

function __bg_dev_grid() { 
__background_init__(this, bg_dev_grid, 'img/bg_dev_grid.png')}; var bg_dev_grid = new __bg_dev_grid();

function __ts_woodenblock() { 
__background_init__(this, ts_woodenblock, 'img/ts_woodenblock.png')}; var ts_woodenblock = new __ts_woodenblock();

function __ts_cave() { 
__background_init__(this, ts_cave, 'img/ts_cave_mono_strip16.png')}; var ts_cave = new __ts_cave();

function __ts_cat_trail() { 
__background_init__(this, ts_cat_trail, 'img/s_cat_trail.png')}; var ts_cat_trail = new __ts_cat_trail();

function __ts_sand() { 
__background_init__(this, ts_sand, 'img/ts_sand_strip16.png')}; var ts_sand = new __ts_sand();

function __ts_tree() { 
__background_init__(this, ts_tree, 'img/ts_tree_strip16.png')}; var ts_tree = new __ts_tree();

function __ts_panel() { 
__background_init__(this, ts_panel, 'img/ts_segment_strip16.png')}; var ts_panel = new __ts_panel();

function __ts_wood() { 
__background_init__(this, ts_wood, 'img/ts_wood_strip16.png')}; var ts_wood = new __ts_wood();

function __ts_bigbrick() { 
__background_init__(this, ts_bigbrick, 'img/ts_bigbrick_strip16.png')}; var ts_bigbrick = new __ts_bigbrick();

function __ts_huge() { 
__background_init__(this, ts_huge, 'img/s_bl_ground_giant_strip16.png')}; var ts_huge = new __ts_huge();

function __ts_woodenhuge() { 
__background_init__(this, ts_woodenhuge, 'img/s_bl_woodblock_giant.png')}; var ts_woodenhuge = new __ts_woodenhuge();

function __ts_groundalt() { 
__background_init__(this, ts_groundalt, 'img/ts_ground_alt_strip16.png')}; var ts_groundalt = new __ts_groundalt();

function __ts_metal() { 
__background_init__(this, ts_metal, 'img/ts_metal_strip16.png')}; var ts_metal = new __ts_metal();

function __ts_pipe() { 
__background_init__(this, ts_pipe, 'img/ts_pipe_strip16.png')}; var ts_pipe = new __ts_pipe();



/***********************************************************************
 * FONTS
 ***********************************************************************/


/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __o_bl_ground() {
__instance_init__(this, o_bl_ground, null, 0, 1, s_ground, 1, 0);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_ground, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_ground = new __o_bl_ground();

function __o_kot() {
__instance_init__(this, o_kot, null, 1, 0, s_kot, 1, 1);
this.on_creation = function() {
with(this) {
// MARCELLUS LEWIS OSWALD LAQUAN VII
player_object = this;
image_speed = 0;
sprite_index = player_character;

x += character_spawn_offset_x;
xstart += character_spawn_offset_x;
y += character_spawn_offset_y;
ystart += character_spawn_offset_y;

// Variables
this.distance_travelled = 0;

this.vx = 0;
this.vy = 0;
this.vxe = 0;
this.vye = 0;
this.vxt = 0;
this.vyt = 0;
this.dirx = 0;
this.diry = 0;
this.dirx_last = 0;
this.diry_last = 0;
this.coyote = 0;
this.coyote_max = 5;
this.jumpbuffer = 0;
this.jumpbuffer_max = 5;
this.jumpbrake_disabled = false;
this.sprite_dir = 1;
this.xsafe = x;
this.ysafe = y;
this.grounded = false;
this.dead = false;


// Properties
this.friction = 0.8;
this.airfriction = 0.95;
this.gravity = 0.5;
this.jumppower = 8;
this.accel = 0.5;
this.jumpbrake = 0.6;
this.jumptrampoline = 1.6;
this.vx_max = 3;
this.vy_max = 3;
this.enemy_bounce = 0.75;
this.enemy_bounce_high = 1;
this.stomp_lenient = true;
this.stomp_offset = 0;



// - MODES - //
this.mode = null;
this.decoration = null;
this.decoration_frame = 0;

function playermode(name) {
	this.name = name;
	// Properties
	this.gravity = 0.5;
	this.friction = 0.8;
	this.airfriction = 0.8;
	this.jumppower = 8;
	this.jumpbrake = 0.6;
	this.accel = 0.5;
	this.vx_max = 3;
	this.vy_max = 3;
	this.decoration = null;
	this.stomp_lenient = true;
	this.stomp_offset = 0;
	
	
	this.begin = function(me) {}
	this.update = function(me) {}
	this.lateupdate = function(me) {}
	this.end = function(me) {}
	this.on_collision_h = function(me) {
		me.vx *= 0.1;
	}
	this.on_collision_v = function(me) {}
	this.on_death = function(me) {}
	
	this.activate = function(me) {
		if(me.mode != null) me.mode.end(me);
		me.mode = this;
		me.gravity = this.gravity;
		me.friction = this.friction;
		me.jumppower = this.jumppower;
		me.jumpbrake = this.jumpbrake;
		me.accel = this.accel;
		me.vx_max = this.vx_max;
		me.vy_max = this.vy_max;
		me.decoration = this.decoration;
		me.decoration_frame = 0;
		me.stomp_lenient = this.stomp_lenient;
		me.stomp_offset = this.stomp_offset;
		this.begin(me);
	}
	
	this.jump = function(me) {
		if(place_meeting(me.x, me.y-this.jumppower, o_dev_solid) == null && (me.grounded || (me.coyote > 0 && me.diry != -1))) {
			me.jumpbuffer = 0;
			me.vy = -this.jumppower;
			sound_c_play(snd_jump);
		}
	}
}

// Foot mode (default)
this.m_foot = new playermode("foot"); // no custom settings, will use default ones

// Heli mode
this.m_heli = new playermode("heli");
this.m_heli.decoration = s_heli;
this.m_heli.gravity = 0.2;
this.m_heli.friction = 0.95;
this.m_heli.airfriction = 0.95;
this.m_heli.jumppower = 4;
this.m_heli.jumpbrake = 1;
this.m_heli.accel = 0.25;
this.m_heli.vx_max = 4;
this.m_heli.stomp_lenient = false;
this.m_heli.stomp_offset = 6;

this.m_heli.jump = function(me) {
	if(place_meeting(me.x, me.y-this.jumppower, o_dev_solid) == null) {
		me.jumpbuffer = 0;
		me.vy = -this.jumppower;
		sound_c_play(snd_float);
	}
}

this.m_heli.on_collision_h = function(me) {
	me.vx = -me.vx * 0.6;
	sound_c_play(snd_bump);
}

this.m_heli.on_collision_v = function(me) {
	if(abs(me.vy) > 0.3) sound_c_play(snd_bump);
	me.vy = -me.vy * 0.6;
}

this.m_heli.on_death = function(me) {
	spawn_corpse(me.x, me.y, s_heli, me.sprite_dir);
}

this.m_heli.begin = function(me) {
	this.animf = 0;
	me.vy = 0;
}

this.m_heli.update = function(me) {
	if(game_timer % 2 == 0) me.decoration_frame += 1;
	if(me.decoration_frame > 6) me.decoration_frame = 0;
}

this.m_heli.end = function(me) {
	spawn_corpse(me.x, me.y, s_heli, me.sprite_dir);
	sound_c_play(snd_vehicledie);
}


// Activate default mode
this.m_foot.activate(this);

// - FUNCTIONS - //
this.die = function() {
	if(!this.dead) {
		this.vx = 0;
		this.vy = 0;
		spawn_corpse(x, y, player_character, sprite_dir);
		sound_c_play(snd_dead);
		last_score = hud_object.score;
		highscore_update();
		this.mode.on_death(this);
		this.dead = true;
	}
};

this.try_stomp = function(other) {
if(!other.dead && !this.dead) {
	if(this.stomp_lenient == true) {
		if(this.vy > 0) {
			other.die();
			sound_c_play(snd_stomp);
			hud_object.score += 200;
			if(keyboard_check(k_up)) this.vy = -(this.jumppower * this.enemy_bounce_high);
			else this.vy = -(this.jumppower * this.enemy_bounce);
		} else { this.die() };
	} else {
		if(this.y+this.mode.stomp_offset < other.y) {
			other.die();
			sound_c_play(snd_stomp);
			hud_object.score += 200;
			this.vy = -this.jumppower;
		} else this.die();
	}
}
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(game_paused) {
	image_speed = 0;
	return;
}

// Get direction from speed
this.dirx = Math.sign(vx);
this.diry = Math.sign(vy);
if(this.dirx != 0) this.dirx_last = this.dirx;
if(this.diry != 0) this.diry_last = this.diry;

// - Controls and movement -
if(!this.dead) {
	this.mode.update(this);
	// Jumping
	if(input_pressed(k_up, k_jump, vk_w)) {
		game_started = true;
		this.jumpbuffer = this.jumpbuffer_max;
	}
	
	if(input_released(k_up, k_jump, vk_w) && this.diry == -1 && !this.jumpbrake_disabled ) {
		this.vy *= this.jumpbrake;
	}
	
	if(this.jumpbuffer > 0) {
		this.mode.jump(this);
		this.jumpbuffer -= 1;
	}
	
	// Falling
	if(!this.grounded) {
		this.vy += this.gravity;
		if(this.coyote > 0) this.coyote -= 1;
	} else {
		this.coyote = this.coyote_max;
	}
	
	// Limit and apply speed	
	if(this.vx > this.vx_max) this.vx = this.vx_max;
	if(this.vx < -this.vx_max) this.vx = -this.vx_max;
	x += this.vx;
	y += this.vy;
	x += this.vxe;
	y += this.vye;
	this.vxe = 0;
	this.vye = 0;

	// Horizontal movement
	this.keyx = ((input_down_int(k_right, vk_d) || gpadButton(15)) - (input_down_int(k_left, vk_a) || gpadButton(14)));
	if(keyx != 0) {
		game_started = true;
		this.sprite_dir = this.keyx;
		this.vx += this.accel * this.keyx;
		if(this.grounded) image_speed = 0.25;
	}
	else {
		if(grounded) this.vx = this.vx * this.friction;
		if(!grounded) this.vx = this.vx * this.airfriction;
		image_speed = 0;
		image_index = 0;
	}
}

// Additional check for stompable enemies, things are a bit messy for now, will make it better later
let stompable = place_meeting(x, y+vy, o_enemy_rat);
if(stompable == null) stompable = place_meeting(x, y+vy, o_enemy_ratheli);
if(stompable == null) stompable = place_meeting(x, y+vy, o_enemy_missile);
if(stompable == null) stompable = place_meeting(x, y+vy, o_enemy_rathuge);
if(stompable != null && this.vy > 0) {
	this.try_stomp(other);
}

// - Collision detection -
// Vertical
if((place_meeting(x, y+this.vy, o_dev_solid) != null || place_meeting(x, y+this.vy, o_trampoline)) && diry != 0) {
	this.mode.on_collision_v(this);
}

if(this.vy != 0 && this.diry != 0 && place_meeting(x, y+this.vy, o_dev_solid) != null) {
	while(place_meeting(x, y+this.vy, o_dev_solid) != null) {
		this.vy -= this.diry;
	}
	y += this.vy;
	this.vy = 0;
}

// Horizontal
if((place_meeting(x+this.vx, y, o_dev_solid) != null || place_meeting(x+this.vx, y, o_trampoline)) && dirx != 0) {
	this.mode.on_collision_h(this);
}

if(place_meeting(x+this.keyx, y, o_dev_solid) != null || place_meeting(x+this.keyx, y, o_trampoline)) {
    this.vx = 0;
}

if(this.vx != 0 && place_meeting(x+this.vx, y, o_dev_solid) != null && dirx != 0) {
	while(place_meeting(x+this.vx, y, o_dev_solid) != null) {
		this.vx -= this.dirx;
	}
	x += this.vx;
	this.vx = 0;
}

// Check if the player's touching the ground
if(place_meeting(x, y+1, o_dev_solid) != null && place_meeting(x, y+1, o_trampoline) == null) {
	this.grounded = true;
	this.jumpbrake_disabled = false;
} else {
	this.grounded = false;
}

// Collision with moving platforms
let platform;
if(vy > 0.01) platform = place_meeting(x, y+this.vy+2, o_platform);
if(platform != null && platform.y > y) {
	this.mode.on_collision_v(this);
	y = platform.y - sprite_index.yoffset + platform.vy;
	this.vxe = platform.vx * 2; // GHETTO FIX LOL !!!!!!!!!!!!!!
	this.vye = platform.vy;
	this.vy = 0;
	this.grounded = true;
}

// Anti-stuck
if(place_meeting(x, y, o_dev_solid) == null) {
	this.xsafe = x;
	this.ysafe = y;
}
else {
	x = this.xsafe;
	y = this.ysafe;
}

// Trampoline interaction
let trmp = place_meeting(x, y+2, o_trampoline);
if(trmp == null) trmp = place_meeting(x, y-2, o_trampoline); 
if(trmp != null) {
	sound_c_play(snd_trampoline);
	this.vy = (-this.jumppower * this.jumptrampoline)*trmp.dir;
	this.jumpbrake_disabled = true;
	trmp.image_speed = 0.5;
}

// Conveyor belt interaction
if(place_meeting(x, y+2, o_conveyor_l)) {
	if(place_meeting(x-2, y, o_dev_solid) == null) this.vxe = -2;
}

if(place_meeting(x, y+2, o_conveyor_r)) {
	if(place_meeting(x+2, y, o_dev_solid) == null) this.vxe = 2;
}

// Dying conditions
if(place_meeting(x, y, o_dev_hazard) != null) { this.die(); }
if(place_meeting(x, y, o_enemy_cactus) != null) { this.die(); }
if(place_meeting(x, y, o_enemy_spikes) != null) { this.die(); }
if(place_meeting(x, y, o_enemy_crusher) != null) { this.die(); }
if(y-sprite_index.height > room_height) { this.die(); }
if(x+sprite_index.width < room_viewport_x - player_death_margin) { this.die(); }




}
};
this.on_end_step = function() {
with(this) {
if(game_paused || this.dead) return;
this.mode.lateupdate(this);

if(x > this.distance_travelled) { 
	this.distance_travelled = x;
	hud_object.score += floor(abs(player_object.vx*0.3));
}

// Dont let him go out of bounds
if(x+4 > room_viewport_x+room_viewport_hborder) { vx = 0; x = xprevious }
if(y < -10) y = -10;

/* debug shit delete later */
//if(y+11 > room_height) { y = room_height-11; this.grounded = true }
if(keyboard_check(vk_ctrl) && debug) { x = camera_object.x; y = camera_object.y+43; vx = 0; vy = 0; }
}
};
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, o_coin);
if(this.other != null) {
other.instance_destroy();
sound_c_play(snd_coin);
hud_object.score += 50;
}
this.other = this.place_meeting(this.x, this.y, o_enemy_rat);
if(this.other != null) {
if(!other.dead && !this.dead) {
	if(this.vy > 0) {
		other.die();
		sound_c_play(snd_stomp);
		hud_object.score += 100;
		if(keyboard_check(k_up)) this.vy = -(this.jumppower * this.enemy_bounce_high);
		else this.vy = -(this.jumppower * this.enemy_bounce);
	} else {
		this.die();
	}
}
}
this.other = this.place_meeting(this.x, this.y, o_veh_heli);
if(this.other != null) {
other.instance_destroy();
this.m_heli.activate(this);
}
this.other = this.place_meeting(this.x, this.y, o_enemy_ratheli);
if(this.other != null) {
if(!this.dead && !other.dead) {
	if(this.mode == this.m_foot) {
		if(this.vy > -1) {
			other.die();
			sound_c_play(snd_stomp);
			hud_object.score += 200;
			if(keyboard_check(k_up)) this.vy = -(this.jumppower * this.enemy_bounce_high);
			else this.vy = -(this.jumppower * this.enemy_bounce);
		} else {
			this.die();
		}
	} else {
		
		if(this.y+6 < other.y) {
			other.die();
			sound_c_play(snd_stomp);
			hud_object.score += 200;
			this.vy = -this.jumppower;
		} else this.die();
	}
}
}
this.other = this.place_meeting(this.x, this.y, o_enemy_missile);
if(this.other != null) {
if(!this.dead) {
	if(this.mode == this.m_foot) {
		if(this.vy > 0) {
			other.die();
			sound_c_play(snd_stomp);
			hud_object.score += 300;
			if(keyboard_check(k_up)) this.vy = -(this.jumppower * this.enemy_bounce_high);
			else this.vy = -(this.jumppower * this.enemy_bounce);
		} else this.die();
	} else {
		if(this.y+6 < other.y) {
			other.die();
			sound_c_play(snd_stomp);
			hud_object.score += 300;
			this.vy = -this.jumppower;
		} else this.die();
	}
}
}
this.other = this.place_meeting(this.x, this.y, o_enemy_rathuge);
if(this.other != null) {
if(!other.dead && !this.dead) {
	if(this.vy > 0 && this.y > other.y+8) {
		other.die();
		sound_c_play(snd_stomp);
		hud_object.score += 200;
		if(keyboard_check(k_up)) this.vy = -(this.jumppower * this.enemy_bounce_high);
		else this.vy = -(this.jumppower * this.enemy_bounce);
	} else {
		this.die();
	}
}
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if(!this.dead) {
	draw_sprite_ext(player_character, image_index, ceil(x), ceil(y), this.sprite_dir, 1, 0, 1);
	if(this.decoration != null) {
		draw_sprite(this.decoration, this.decoration_frame, ceil(x), ceil(y));
	}
}

if(debug) {
	draw_sprite_text(room_viewport_x+8, room_viewport_y+24, this.mode.name.toUpperCase() + " X: " + x.toFixed(2).toString() + " Y: " + y.toFixed(2).toString() + " J: " + this.jumpbuffer.toString() + " C: " + this.coyote.toString() + (this.jumpbrake_disabled ? " BD" : ""));
	//draw_sprite_text(ceil(x)-4, ceil(y)-16, this.distance_travelled.toString());
}
}
}
};
}; var o_kot = new __o_kot();

function __o_camera() {
__instance_init__(this, o_camera, null, 1, 0, s_dev_camera, 0, 3);
this.on_creation = function() {
with(this) {
camera_object = this;

this.vx = camera_speed_start;
this.tick = 0;
this.interval = camera_speedup_interval;
this.increment = camera_speedup_increment;
this.stage_two = false;

this.reset = function() {
	this.vx = 1;
	this.tick = 0;
	this.interval = camera_speedup_interval;
	this.increment = camera_speedup_increment;
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(!game_started || game_paused) return;
if(game_expert && this.vx == camera_speed_start)  this.vx = camera_speed_expert;

if(!player_object.dead) this.x += this.vx;
if(this.vx >= camera_speedup_stage2trigger) this.stage_two = true;


if(this.tick >= this.interval) {
	this.vx += camera_speedup_speed;
	this.tick = 0;
	this.interval += this.increment;
	this.increment += camera_speedup_increment;
	if(this.stage_two) this.increment += camera_speedup_stage2increment;
}

if(this.vx > camera_speedup_maxspeed) this.vx = camera_speedup_maxspeed;

this.tick += 1 + (1 * game_expert);

if(x+2000 > room_width) {
	room_width += 4000;
}

 //debug
if(debug) {
if(keyboard_check(vk_z)) {
	x -= this.vx*(camera_debug_speed*2);
}

if(keyboard_check(vk_x)) {
	x -= this.vx;
}

if(keyboard_check(vk_c)) {
	x += this.vx*camera_debug_speed;
}
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if(debug) {
	draw_sprite(sprite_index, image_index, ceil(x), y);
	draw_sprite_text(room_viewport_x+8, room_viewport_y+32, "CAM: " + this.tick.toString() + "/" + this.interval.toString() + "(+" + this.increment.toString() + ") " + this.vx.toFixed(2).toString() + "/" + camera_speedup_maxspeed.toString() + " " + x.toFixed(3).toString());
}
}
}
};
}; var o_camera = new __o_camera();

function __o_hud() {
__instance_init__(this, o_hud, null, 1, 0, s_dev_cube, 0, 4);
this.on_creation = function() {
with(this) {
hud_object = this;
game_paused = false;

this.pausepressed = false;
this.chc = "";
this.score = 0;
this.score_add = 0;
this.tick = 0;
game_started = false;

instance_create(0, 0, o_debug_line);

this.reset_score = function() {
	this.score = 0;
	this.tick = 0;
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
game_timer += 1;
if(!game_started) {
	if(keyboard_check_pressed(k_pause)) game_expert = !game_expert;
	return;
}
if(game_paused) {
	if(keyboard_check_pressed(k_pause)) game_paused = false;
} else {
	if(this.tick >= 30) {
		this.tick = 0;
	}
	this.tick += 1;
	
	if(!player_object.dead) {
		//if(player_object.x > player_object.distance_travelled) this.score += floor(abs(player_object.vx*0.3));
		
		
		if(keyboard_check_pressed(k_pause)) {
			game_paused = true;
			sound_c_play(snd_pause);
		}
	} else {
		if(input_released(k_jump, k_pause)) {
			room_goto_first();
		}
	}
}
}
};
this.on_end_step = function() {
with(this) {
ccheck();
if(keyboard_check_pressed(vk_f2)) sound_enabled = !sound_enabled;

if(keyboard_check_pressed(vk_f11)) debug = !debug;
if(keyboard_check_pressed(vk_1)) debug = !debug;
if(debug) {
	if(keyboard_check_pressed(vk_2)) if(room_background == null) { room_background = bg_dev_grid.image } else room_background = null;
	if(keyboard_check(vk_3)) if(game_timer % 3 == 0) tile_add(ts_cat_trail, 0, 0, 16, 22, ceil(player_object.x)-8, ceil(player_object.y)-11, 5);
	if(keyboard_check_pressed(vk_4)) debug_showsolids = !debug_showsolids;
	if(keyboard_check(vk_0)) room_goto(sc_init);
}
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
this.zeros = 9;
this.score_str = this.score.toString()
this.hiscore_str = high_score.toString()

draw_set_alpha(1);

this.score_str = ((this.zeros-this.score_str.length > 0) ? ("0".repeat(this.zeros-this.score_str.length)+this.score_str) : this.score_str);
this.hiscore_str = ((this.zeros-this.hiscore_str.length > 0) ? ("0".repeat(this.zeros-this.hiscore_str.length)+this.hiscore_str) : this.hiscore_str);

draw_sprite_text(room_viewport_x + 8, room_viewport_y + 8 ,  score_str);

if(game_expert) draw_sprite_text(room_viewport_x + 88, room_viewport_y + 8,  "EX");

if(debug) {
	draw_set_color(255, 255, 255);
	draw_sprite_text(room_viewport_x + 8, room_viewport_y + 138, "v. " + game_meta_version);
	draw_sprite_text(room_viewport_x + 8, room_viewport_y + 146, "by micai");
}

if(game_paused) {
	draw_set_color(255, 255, 255);
	draw_rectangle(room_viewport_x + 136, room_viewport_y + 72, room_viewport_x + 184, room_viewport_y + 80, false);
	draw_sprite_text(room_viewport_x + 136, room_viewport_y + 72, "PAUSED");
}

if(player_object.dead) {
	draw_set_color(255, 255, 255);
	draw_rectangle(room_viewport_x + 120, room_viewport_y + 72, room_viewport_x + 192, room_viewport_y + 80, false);
	draw_sprite_text(room_viewport_x + 120, room_viewport_y + 72, "GAME OVER");
	if(last_score == high_score) {
		if(this.tick < 15) draw_sprite_text(room_viewport_x + 216, room_viewport_y + 8 ,  "HI "+ hiscore_str);
	} else draw_sprite_text(room_viewport_x + 216, room_viewport_y + 8 ,  "HI "+ hiscore_str);
} else {
	draw_sprite_text(room_viewport_x + 216, room_viewport_y + 8 ,  "HI "+ hiscore_str);
}


}
}
};
}; var o_hud = new __o_hud();

function __o_enemy_spikes() {
__instance_init__(this, o_enemy_spikes, null, 1, 0, s_spikes, 1, 5);
this.on_creation = function() {
with(this) {
this.bound = false;
image_speed = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
if(!this.bound) {
if(place_meeting(x, y+16, o_dev_solid)) image_index = 0;
else if(place_meeting(x, y-16, o_dev_solid)) image_index = 1;
//else if(place_meeting(x+16, y, o_dev_solid)) image_index = 2;
//else if(place_meeting(x-16, y, o_dev_solid)) image_index = 3;
this.bound = true;
}

if(x < room_viewport_x-48) {
	instance_destroy();
}
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_enemy_spikes = new __o_enemy_spikes();

function __o_dev_solid() {
__instance_init__(this, o_dev_solid, null, 1, 0, col_16x, 1, 6);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(x < room_viewport_x-48) instance_destroy();

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if(debug_showsolids) draw_sprite(s_dev_fill50, 0, x, y);
}
}
};
}; var o_dev_solid = new __o_dev_solid();

function __o_dev_hazard() {
__instance_init__(this, o_dev_hazard, null, 0, 0, s_dev_no, 1, 7);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_dev_hazard = new __o_dev_hazard();

function __o_bl_brick() {
__instance_init__(this, o_bl_brick, null, 0, 0, s_brick, 1, 8);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_brick, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_brick = new __o_bl_brick();

function __o_bl_cloud() {
__instance_init__(this, o_bl_cloud, null, 0, 0, s_cloud, 1, 9);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
autotile(this, 16, ts_cloud, o_dev_solid);
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_cloud = new __o_bl_cloud();

function __o_coin() {
__instance_init__(this, o_coin, null, 1, 2, s_coin, 1, 10);
this.on_creation = function() {
with(this) {
image_speed = 0.25;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(x < room_viewport_x-48) {
	instance_destroy();
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_coin = new __o_coin();

function __o_enemy_rat() {
__instance_init__(this, o_enemy_rat, null, 1, 2, s_enemy_rat, 1, 11);
this.on_creation = function() {
with(this) {
x += character_spawn_offset_x;
xstart += character_spawn_offset_x;
y += character_spawn_offset_y;
ystart += character_spawn_offset_y;

this.vx = -0.5;
this.vy = 0;
this.sprite_dir = -1;
this.grounded = false;
this.dead = false;
this.dead_fade = 0;
this.dead_fade_max = 60;

this.vx_max = 2;
this.vy_max = 4;
this.gravity = 0.5;

this.image_speed_max = image_speed = 0.1;

this.die = function(how=0) {
	if(!this.dead) {
		this.dead = true;
		if(how == 1) {
			spawn_corpse(x, y, sprite_index, sprite_dir);
			instance_destroy();
			return;
		}
		sprite_index = s_enemy_rat_dead;
		this.vx = 0;
		this.dead_fade = 0;
	}
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(game_paused) return;
if(x > room_viewport_x+room_viewport_width) return;
if( y + 16 > room_height ) instance_destroy();
if(x < room_viewport_x-despawn_margin) instance_destroy()

if(place_meeting(x-this.vx, y, o_dev_solid) != null || place_meeting(x+this.vx, y, o_dev_solid) != null) { this.vx = -this.vx; this.sprite_dir = -this.sprite_dir}
this.vy += this.gravity;
if(place_meeting(x, y+this.vy, o_dev_solid) != null) {
	this.vy = 0;
	image_speed = this.image_speed_max;
} else {
	image_speed = 0;
}


if(this.vx > this.vx_max) this.vx = this.vx_max;
if(this.vx < -this.vx_max) this.vx = -this.vx_max;

if(this.dead) {
	if(this.dead_fade >= this.dead_fade_max) instance_destroy();
	this.dead_fade += 1;
}

// Trampoline interaction
let trmp = place_meeting(x, y+2, o_trampoline);
if(trmp == null) trmp = place_meeting(x, y-2, o_trampoline); 
if(trmp != null) {
	sound_c_play(snd_trampoline);
	this.vy = (-8)*trmp.dir;
	trmp.image_speed = 0.5;
}

x += this.vx;
y += this.vy;
}
};
this.on_end_step = function() {
with(this) {

}
};
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, o_enemy_spikes);
if(this.other != null) {
this.die(1);
}
this.other = this.place_meeting(this.x, this.y, o_enemy_cactus);
if(this.other != null) {
this.die(1);
}
this.other = this.place_meeting(this.x, this.y, o_enemy_crusher);
if(this.other != null) {
this.die();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(sprite_index, image_index, ceil(x), ceil(y), 1*this.sprite_dir, 1, 0, 1);
}
}
};
}; var o_enemy_rat = new __o_enemy_rat();

function __o_world_generator() {
__instance_init__(this, o_world_generator, null, 1, 0, s_dev_cube, 1, 12);
this.on_creation = function() {
with(this) {
world_generator_object = this;

this.tick = 0;
this.bigtick = 0;

prefab_len_total = 0;
prefab_len_last = 0;
this.next_prefab;
this.next_prefab_index = 0;
this.next_bank;
this.next_bank_index = 0;

if(prefab_testing == null) {
	prefab_deploy(0, 0, pr_spawnpoint, 3);
} else {
	prefab_deploy(0, 0, pr_spawnpoint_short, 4);
	prefab_deploy(prefab_len_total, 0, prefab_testing, 4);
}

this.start = null;
this.end = null;
this.rotation = [];
this.bank_rotation = [
	[],
	[],
	[],
	[]
];
this.last_rotation = 0;

this.current_name = "NULL";
this.current = 0;
this.limit = 0;
this.banksize = 0;
this.repeat = false;
this.min_gap = 1;
this.max_gap = 1;

this.add_bank = function(bank, rarity=0) {
	this.bank_rotation[rarity].push(bank);
	console.info("Added bank " + bank.name + " to rotation " + rarity.toString());
}

this.del_bank = function(bank, rarity=0) {
	this.bank_rotation[rarity].splice(this.bank_rotation[rarity].indexOf(bank), 1);
	console.info("Removed bank " + bank.name + " from rotation " + rarity.toString());
}

this.move_bank = function(bank, from=0, to=0) {
	this.bank_rotation[from].splice(this.bank_rotation[from].indexOf(bank), 1);
	this.bank_rotation[to].push(bank);
	console.info("Moved bank " + bank.name + " from rotation " + from.toString() + " to " + to.toString());
}

this.show_banks = function() {
	let rotnames = ["VERY COMMON: \n", "COMMON: \n", "RARE: \n", "VERY RARE: \n"];
	let st = "";
	for(let i=0; i<4; i++) {
		st = st.concat(rotnames[i]);
		for(let j=0; j<bank_rotation[i].length; j++) {
			st = st.concat(" - " + bank_rotation[i][j].name + "\n");
		}
		st = st.concat("\n");
	}
	console.log(st);
}

this.load_bank = function(bank) {
	this.current_name = bank.name;
	this.current = 0;
	this.limit = random_int(bank.length_min, bank.length_max);
	this.repeat = bank.repeat;
	this.rotation = bank.middle.slice();
	this.min_gap = bank.gap_min;
	this.max_gap = bank.gap_max;
	prefab_ceiling = bank.ceiling;
	if(game_expert) this.rotation = this.rotation.concat(bank.hard);
	if(Math.random() < 0.5) this.rotation = this.rotation.concat(bank.rare);
	this.banksize = this.rotation.length;
	if(bank.start.length > 0) this.start = bank.start[random_int(0, bank.start.length-1)];
	if(bank.end.length > 0) this.end = bank.end[random_int(0, bank.end.length-1)];
	previous_bank = bank;
}

this.choose_bank = function() {
	this.skip = false;
	this.iterations = 0;
	this.random1 = 0;
	this.random2 = 0;
	this.sel = [];
	
	do {
		this.skip = false;
		this.random1 = Math.random();
		//console.log("r1: " + this.random1.toString());
		
		// Select one of the bank rotations
		if(this.random1 > 0.92 && this.bank_rotation[3].length != 0 && this.last_rotation != 3) {
			console.log("attempt: " + iterations.toString() + "    r1: " + this.random1.toString() + " - very rare");
			this.sel = this.bank_rotation[3];
			this.last_rotation = 3;
		} else if(this.random1 > 0.85 && this.bank_rotation[2].length != 0 && this.last_rotation != 2) {
			console.log("attempt: " + iterations.toString() + "    r1: " + this.random1.toString() + " - rare");
			this.sel = this.bank_rotation[2];
			this.last_rotation = 2;
		} else if(this.random1 > 0.50 && this.bank_rotation[1].length != 0 && this.last_rotation != 1) {
			console.log("attempt: " + iterations.toString() + "    r1: " + this.random1.toString() + " - common");
			this.sel = this.bank_rotation[1];
			this.last_rotation = 1;
		} else {
			console.log("attempt: " + iterations.toString() + "    r1: " + this.random1.toString() + " - very common");
			this.sel = this.bank_rotation[0];
			this.last_rotation = 0;
		}
		
		//console.log(this.sel);
		
		// Choose a bank from the selected rotation
		this.next_bank_index = random_int(0, this.sel.length-1);
		this.next_bank = this.sel[this.next_bank_index];
		
		// Failsafes in case something goes wrong
		this.iterations += 1;
		if(this.next_bank == null) {
			this.skip = true;
			console.warn("failsafe triggered: next_bank is null");
		}
		
	} while(this.sel.length > 1 && this.iterations < 20 && (this.next_bank == previous_bank || this.skip));
	
	if(!(iterations < 20)) {
		console.warn("failsafe triggered: exceeded iteration limit");
	}
	
	if(this.next_bank == null) {
		console.warn("failsafe triggered: next_bank still null after exiting the loop");
		this.next_bank = prefab_bank_first;
	}
	
	this.load_bank(this.next_bank);
}

this.add_bank(pbank_grass1, 0);
this.add_bank(pbank_wood1, 0);

if(prefab_bank_testing != null) {
	this.load_bank(prefab_bank_testing);
} else choose_bank();
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(camera_object.x + 160 > prefab_len_total*16) {
	// deploy starter prefab if exists
	if(this.start != null) { 
		marker(prefab_len_total*16, 0, "start");
		prefab_deploy(prefab_len_total, 0, this.start, random_int(this.min_gap, this.max_gap), prefab_ceiling);
		this.start = null;
		return;
	}
	
	// ending the current set and loading a new bank
	if(this.current >= this.limit || this.limit == 0) {
		if(this.end != null) { 
			marker(prefab_len_total*16, 0, "end");
			prefab_deploy(prefab_len_total, 0, this.end, random_int(2, 3));
			this.end = null;
		}
		//this.load_bank(prefab_banks[random_int(0, prefab_banks.length-1)]);
		this.choose_bank();
		return;
	}
	
	do {
		this.next_prefab_index = random_int(0, this.rotation.length-1);
		this.next_prefab = this.rotation[this.next_prefab_index];
	} while(this.rotation.length > 1 && this.next_prefab == previous_prefab);
	
	if(this.current == this.limit-1) prefab_ceiling = "";
	marker(prefab_len_total*16, 0, "mid" + this.current.toString());
	prefab_deploy(prefab_len_total, 0, this.next_prefab, random_int(this.min_gap, this.max_gap), prefab_ceiling);
	if(!this.repeat) this.rotation.splice(this.next_prefab_index, 1);
	this.current += 1;
}

/*
if(camera_object.x + 160 > prefab_len_total*16) {
	do {
		this.next_prefab = prefab_list[Math.floor(Math.random()*prefab_list.length)];
	} while(this.next_prefab == previous_prefab);
	previous_prefab = this.next_prefab;
	prefab_deploy(prefab_len_total, 0, this.next_prefab, choose(2,3,4));
}
*/
}
};
this.on_end_step = function() {
with(this) {
// ADDING AND REMOVING BANKS BASED ON TIME ELAPSED
if(!game_started || game_paused) return;
this.tick += 1;

if(this.tick > 1000) {
	this.tick = 0;
	this.bigtick += 1;
	
	switch(bigtick) {
		case 1:
			this.add_bank(pbank_castle1, 0);
			this.add_bank(pbank_heli1, 1);
			break;
		
		case 2:
			this.add_bank(pbank_desert1, 0);
			this.add_bank(pbank_clouds1, 0);
			this.move_bank(pbank_castle1, 0, 1);
			this.add_bank(pbank_ground1, 0);
			break;
			
		case 3:
			this.add_bank(pbank_panel1, 2);
			this.add_bank(pbank_cave1, 0);
			this.move_bank(pbank_grass1, 0, 1);
			this.move_bank(pbank_castle1, 1, 2);
			break;
		
		case 4:
			this.add_bank(pbank_egg1, 3);
			break;
			
		case 5:
			break;
	}
	
	this.show_banks();
}

}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if(debug) {
	draw_sprite_text(room_viewport_x+8, room_viewport_y+40, "PLX: " + (prefab_len_total*16).toString() + " PLT: " + prefab_len_total.toString() + " PLL: " + prefab_len_last.toString());
	draw_sprite_text(room_viewport_x+8, room_viewport_y+48, this.current_name.toUpperCase() + " " + ((this.start != null) ? "S " : "") + ((this.end != null) ? "E " : "") + this.current.toString() + "/" + this.limit.toString() + " " + this.next_prefab_index.toString() + "/" + this.rotation.length.toString() + " T: " + this.tick.toString() + "/" + this.bigtick.toString());
}
}
}
};
}; var o_world_generator = new __o_world_generator();

function __o_debug_line() {
__instance_init__(this, o_debug_line, null, 1, 0, s_debug_line, 1, 14);
this.on_creation = function() {
with(this) {
x -= 1;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
visible = debug;
if(room_viewport_x - despawn_margin > x) x = ceil(room_viewport_x - despawn_margin);
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_debug_line = new __o_debug_line();

function __o_dev_mainmenu() {
__instance_init__(this, o_dev_mainmenu, null, 1, 0, s_dev_unknown, 1, 17);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(keyboard_check_pressed(vk_enter)) {
	room_goto_next();
}

ccheck();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_text(8, 8, "OSWALD Beta");
draw_sprite_text(8, 16, "by micai   ver. " + game_meta_version);

draw_sprite_text(8, 32, "Your last score: " + last_score.toString());
draw_sprite_text(8, 40, "Your high score: " + high_score.toString());

draw_sprite_text(8, 64, "Move with ARROW KEYS");
draw_sprite_text(8, 72, "Hold UP to jump higher");
draw_sprite_text(8, 88, "Press ENTER to start");
}
}
};
}; var o_dev_mainmenu = new __o_dev_mainmenu();

function __o_dev_cat_demo() {
__instance_init__(this, o_dev_cat_demo, null, 1, 0, s_kot, 1, 18);
this.on_creation = function() {
with(this) {
image_speed = 0.1;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
x += 1;
if(x > room_width+16) { x = -16 };
sprite_index = player_character;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_dev_cat_demo = new __o_dev_cat_demo();

function __o_bl_woodenblock() {
__instance_init__(this, o_bl_woodenblock, null, 0, 0, s_woodenblock, 1, 19);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
tile_add(ts_woodenblock, 0, 0, 16, 16, x, y, 1);

instance_create(x, y, o_dev_solid);
if(y == 0) instance_create(x, y-16, object_index);
if(y == room_height-16) instance_create(x, y+16, object_index);

instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_woodenblock = new __o_bl_woodenblock();

function __o_bl_cave() {
__instance_init__(this, o_bl_cave, null, 0, 0, s_woodenblock, 1, 20);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_cave, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_cave = new __o_bl_cave();

function __o_trampoline() {
__instance_init__(this, o_trampoline, null, 1, 0, s_trampoline, 1, 21);
this.on_creation = function() {
with(this) {
image_speed = 0;
this.dir = 0;
this.yoffset = 0;
instance_create(x, y, o_dev_solid);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
if(x < room_viewport_x-48) instance_destroy();
if(this.dir == 0) {
	if(place_meeting(x, y-16, o_dev_solid) != null) {
		this.dir = -1;
		this.yoffset = 16;
	} else { 
		this.dir = 1; 
	}
}
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
image_index = 0;
image_speed = 0;
}
}
};
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(sprite_index, image_index, x, y+this.yoffset, 1, this.dir, 0, 1);
}
}
};
}; var o_trampoline = new __o_trampoline();

function __o_corpse() {
__instance_init__(this, o_corpse, null, 1, 0, s_kot_burnt, 1, 23);
this.on_creation = function() {
with(this) {

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
y += this.vy;
if(this.vy < -1) this.vy *= 0.8;
else this.vy += 0.5;
if(y > room_width + 16) instance_destroy();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(sprite_index, 0, ceil(x), ceil(y), this.sprite_dir, -1, 0, 1);
}
}
};
}; var o_corpse = new __o_corpse();

function __o_mobile_buttons() {
__instance_init__(this, o_mobile_buttons, null, 1, 0, s_dev_cube, 1, 24);
this.on_creation = function() {
with(this) {
this.mobc_u_x = 256;
this.mobc_u_y = 96;

this.mobc_l_x = 16;
this.mobc_l_y = 96;

this.mobc_r_x = 80;
this.mobc_r_y = 96;

this.mobc_p_x = 256;
this.mobc_p_y = 8;

/*
vkey_add(this.mobc_u_x, this.mobc_u_y, this.mobc_u_x+48, this.mobc_u_y+48, k_jump);
vkey_add(this.mobc_l_x, this.mobc_l_y, this.mobc_l_x+48, this.mobc_l_y+48, k_left);
vkey_add(this.mobc_r_x, this.mobc_r_y, this.mobc_r_x+48, this.mobc_r_y+48, k_right);
*/

vkey_add(this.mobc_u_x, this.mobc_u_y, 48, 48, k_jump);

vkey_add(this.mobc_l_x, this.mobc_l_y, 48, 48, k_left);
vkey_add(this.mobc_r_x, this.mobc_r_y, 48, 48, k_right);

vkey_add(this.mobc_p_x, this.mobc_p_y, 48, 48, k_pause);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if(mobile_controls_enabled) {
	draw_set_alpha(0.25);
	draw_sprite(s_mobc_l, 0, room_viewport_x+mobc_l_x, room_viewport_y+mobc_l_y);
	draw_sprite(s_mobc_r, 0,room_viewport_x+ mobc_r_x, room_viewport_y+mobc_r_y);
	draw_sprite(s_mobc_u, 0, room_viewport_x+mobc_u_x, room_viewport_y+mobc_u_y);
	draw_sprite(s_mobc_p, 0, room_viewport_x+mobc_p_x, room_viewport_y+mobc_p_y);
	draw_sprite_text(room_viewport_x+mouse_x-4, room_viewport_y+mouse_y-4, "+");
	draw_set_alpha(1);
}
}
}
};
}; var o_mobile_buttons = new __o_mobile_buttons();

function __o_sign_noheli() {
__instance_init__(this, o_sign_noheli, null, 1, 2, s_sign_noheli, 1, 157);
this.on_creation = function() {
with(this) {
this.activated = false;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(!this.activated) {
	if(player_object.x > x+32 && player_object.mode.name == "heli") {
		player_object.m_foot.activate(player_object);
		this.activated = true;
	}
}

if(x < room_viewport_x-48) {
	instance_destroy();
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_sign_noheli = new __o_sign_noheli();

function __o_veh_heli() {
__instance_init__(this, o_veh_heli, null, 1, 0, s_heli, 1, 158);
this.on_creation = function() {
with(this) {
y -= 4;

image_speed = 0.2;
this.yoffset = 0;
this.yoffset_dir = 1;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(this.yoffset > 1) { this.yoffset_dir = -1 };
if(this.yoffset < -3) { this.yoffset_dir = 1 };
if(game_timer % 10 == 0) this.yoffset += this.yoffset_dir;

if(x < room_viewport_x-48) {
	instance_destroy();
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite(sprite_index, image_index, ceil(x), ceil(y+this.yoffset));
}
}
};
}; var o_veh_heli = new __o_veh_heli();

function __o_enemy_ratheli() {
__instance_init__(this, o_enemy_ratheli, null, 1, 0, s_enemy_ratheli, 1, 159);
this.on_creation = function() {
with(this) {
image_speed = 0.25;

x += character_spawn_offset_x;
xstart += character_spawn_offset_x;
y += character_spawn_offset_y;
ystart += character_spawn_offset_y;

this.vx = -1;
this.vy = 0;
this.vy_dir = 1;
this.vy_max = 0.75;
this.vy_dir_max = 0.05;

this.sprite_dir = -1;
this.grounded = false;
this.dead = false;
this.dead_fade = 0;
this.dead_fade_max = 60;

this.die = function() {
	this.dead = true;
	spawn_corpse(x, y, sprite_index, sprite_dir, 0, 2);
	spawn_corpse(x, y, s_heli, sprite_dir, 0, 2);
	instance_destroy();
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(game_paused) return;
if(x-8 > room_viewport_x+room_viewport_width) return;
if(x < room_viewport_x-despawn_margin) instance_destroy()

let svx = sign(this.vx);
if(svx != 0) this.sprite_dir = svx;

if(this.vy > this.vy_max) { this.vy_dir = -this.vy_dir_max };
if(this.vy < -this.vy_max) { this.vy_dir = this.vy_dir_max };
if(game_timer % 10 == 0) this.vy += this.vy_dir;

if(place_meeting(x, y+this.vy, o_dev_solid) || y < 8 || y > room_height - 8) {
	this.vy_dir = -this.vy_dir;
	this.vy = -this.vy;
}

if(place_meeting(x+this.vx, y, o_dev_solid)) {
	this.vx = -this.vx;
}

x += this.vx;
y += this.vy;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, o_dev_solid);
if(this.other != null) {
if(place_meeting(x+vx, y-vy, o_dev_solid)) {
	this.vx = -this.vx;
}
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(sprite_index, image_index, ceil(x), ceil(y), 1*this.sprite_dir, 1, 0, 1);
//draw_sprite_ext(sprite_index, 1, ceil(x), ceil(y), 1*this.sprite_dir, 1, 0, 1);
//draw_sprite_ext(s_heli, image_index, ceil(x), ceil(y+1), 1*this.sprite_dir, 1, 0, 1);

}
}
};
}; var o_enemy_ratheli = new __o_enemy_ratheli();

function __o_enemy_cactus() {
__instance_init__(this, o_enemy_cactus, null, 1, 0, s_enemy_cactus, 1, 160);
this.on_creation = function() {
with(this) {
this.bound = false;
image_speed = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
if(!this.bound) {
if(!place_meeting(x, y-16, o_enemy_cactus)) image_index = 1;
this.bound = true;
}

if(x < room_viewport_x-48) {
	instance_destroy();
}
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_enemy_cactus = new __o_enemy_cactus();

function __o_bl_sand() {
__instance_init__(this, o_bl_sand, null, 0, 0, s_woodenblock, 1, 161);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_sand, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_sand = new __o_bl_sand();

function __o_debug_marker() {
__instance_init__(this, o_debug_marker, null, 1, 0, s_debug_line, 1, 162);
this.on_creation = function() {
with(this) {
this.text = "";
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(x < room_viewport_x-64) instance_destroy()
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if(debug) {
	draw_set_color(255, 255, 255);
	draw_rectangle(x, 152, x+this.text.length*8, 160, false);
	draw_sprite_text(x, 152, this.text);
	draw_sprite(s_debug_line, 0, x, y);
}
}
}
};
}; var o_debug_marker = new __o_debug_marker();

function __o_bl_tree() {
__instance_init__(this, o_bl_tree, null, 0, 0, s_woodenblock, 1, 163);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_tree, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_tree = new __o_bl_tree();

function __o_enemy_crusher() {
__instance_init__(this, o_enemy_crusher, null, 1, 1, s_enemy_crusher, 1, 164);
this.on_creation = function() {
with(this) {

// -1 init, 0 - falling, 1 - waiting down, 2 - rising, 3 - waiting up
this.mode = -1;
this.tick = 0;
this.waittime = 20;
this.crushspeed = 4;

this.vx = 0;
this.vy = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
if(game_paused) return;
if(x < room_viewport_x-despawn_margin) instance_destroy()

if(this.mode == -1) {
	this.tick += 1;
	if(this.tick >= 5) {
		this.tick = 0;
		if(y > 16) { 
			this.mode = 1;
		} else this.mode = 3;
	}
}

if(this.mode == 0) {
	this.vy = this.crushspeed;
	this.tick = 0;
	if(place_meeting(x, y+this.vy, o_dev_solid)) {
		this.mode = 1;
		if(x < room_viewport_x+room_viewport_width) sound_c_play(snd_thump);
	}
}
if(this.mode == 1) {
	this.vy = 0;
	this.tick += 1;
	if(this.tick >= this.waittime) {
		this.mode = 2;
	}
}
if(this.mode == 2) {
	this.vy = -this.crushspeed;
	this.tick = 0;
	if(y <= 16) {
		this.mode = 3;
	}
}
if(this.mode == 3) {
	this.vy = 0;
	this.tick += 1;
	if(this.tick >= this.waittime) {
		this.mode = 0;
	}
}

x += this.vx;
y += this.vy;
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_enemy_crusher = new __o_enemy_crusher();

function __o_bl_panel() {
__instance_init__(this, o_bl_panel, null, 0, 0, s_woodenblock, 1, 165);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_panel, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_panel = new __o_bl_panel();

function __o_bl_wood() {
__instance_init__(this, o_bl_wood, null, 0, 0, s_woodenblock, 1, 166);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_wood, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_wood = new __o_bl_wood();

function __o_enemy_missile() {
__instance_init__(this, o_enemy_missile, null, 1, 0, s_enemy_missile, 1, 167);
this.on_creation = function() {
with(this) {
x += 8;
xstart += 8;
y += 8;
ystart += 8;

this.fired = false;
this.dead = false;
this.vx = -3;
this.sprite_dir = -1;

this.die = function() {
	spawn_corpse(x, y, sprite_index, sprite_dir);
	instance_destroy();
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(game_paused) return;
if(x > room_viewport_x+room_viewport_width) return;
if( y + 16 > room_height ) instance_destroy();
if(x < room_viewport_x-despawn_margin) instance_destroy()
if(!fired) {
	fired = true;
	sound_c_play(snd_missile);
}
x += this.vx;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, o_dev_solid);
if(this.other != null) {
this.die();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(sprite_index, image_index, x, y, this.sprite_dir, 1, 0, 1);
}
}
};
}; var o_enemy_missile = new __o_enemy_missile();

function __o_bl_bigbrick() {
__instance_init__(this, o_bl_bigbrick, null, 0, 0, s_woodenblock, 1, 168);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_bigbrick, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_bigbrick = new __o_bl_bigbrick();

function __o_platform() {
__instance_init__(this, o_platform, null, 1, 0, s_platform, 1, 169);
this.on_creation = function() {
with(this) {
// no touchy
this.isfalling = false;

// properties
this.vx = 0;
this.vy = 0;
this.static = true;
this.wrap = true;
this.fall = false;
this.fallspeed = 2;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(x+sprite_index.width+64 < room_viewport_x) instance_destroy();

if(!game_paused && !static) {
	if(place_meeting(x+this.vx, y, o_dev_solid) || place_meeting(x+this.vx, y, o_platform_reverse)) this.vx = -this.vx;
	if(place_meeting(x, y+this.vy, o_dev_solid) || place_meeting(x+this.vx, y, o_platform_reverse)) this.vy = -this.vy;

	x += this.vx;
	y += this.vy;
	
	if(this.wrap) {
		if(y>room_height) y = -8;
		if(y<-8) y = room_height;
	} else {
		if(y>room_height) instance_destroy();	
	}
	
	if(this.fall) {
		if(place_meeting(x, y-2, player_object)) {
			if(player_object.vy >= 0) this.vy = this.fallspeed;
		}
	}
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_platform = new __o_platform();

function __o_platform_move_r() {
__instance_init__(this, o_platform_move_r, null, 1, 0, s_platform, 1, 170);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
let platform = instance_create(x, y, o_platform);
platform.vy = 0;
platform.vx = 1;
platform.static = false;
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_platform_move_r = new __o_platform_move_r();

function __o_platform_move_d() {
__instance_init__(this, o_platform_move_d, null, 1, 0, s_platform, 1, 171);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
let platform = instance_create(x, y, o_platform);
platform.vy = 1;
platform.vx = 0;
platform.static = false;
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_platform_move_d = new __o_platform_move_d();

function __o_platform_move_l() {
__instance_init__(this, o_platform_move_l, null, 1, 0, s_platform, 1, 172);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
let platform = instance_create(x, y, o_platform);
platform.vy = 0;
platform.vx = -1;
platform.static = false;
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_platform_move_l = new __o_platform_move_l();

function __o_platform_move_u() {
__instance_init__(this, o_platform_move_u, null, 1, 0, s_platform, 1, 173);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
let platform = instance_create(x, y, o_platform);
platform.vy = -1;
platform.vx = 0;
platform.static = false;
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_platform_move_u = new __o_platform_move_u();

function __o_platform_reverse() {
__instance_init__(this, o_platform_reverse, null, 0, 0, s_dev_fill50, 1, 174);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_platform_reverse = new __o_platform_reverse();

function __o_platform_fall() {
__instance_init__(this, o_platform_fall, null, 1, 0, s_platform, 1, 175);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
let platform = instance_create(x, y, o_platform);
platform.vy = 0;
platform.vx = 0;
platform.static = false;
platform.fall = true;
platform.wrap = false;
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_platform_fall = new __o_platform_fall();

function __o_bl_huge() {
__instance_init__(this, o_bl_huge, null, 1, 0, col_32x, 1, 176);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 32;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_huge, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) {
		let sol = instance_create(x, y, o_dev_solid);
		sol.sprite_index = col_32x;
	}	
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_huge = new __o_bl_huge();

function __o_bl_woodenhuge() {
__instance_init__(this, o_bl_woodenhuge, null, 1, 0, col_32x, 1, 177);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
tile_add(ts_woodenhuge, 0, 0, 32, 32, x, y, 1);

let sol = instance_create(x, y, o_dev_solid);
sol.sprite_index = col_32x;
if(y == 0) instance_create(x, y-32, object_index);
if(y == room_height-16) instance_create(x, y+32, object_index);

instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_woodenhuge = new __o_bl_woodenhuge();

function __o_enemy_rathuge() {
__instance_init__(this, o_enemy_rathuge, null, 1, 2, s_enemy_rathuge, 1, 178);
this.on_creation = function() {
with(this) {
x += character_spawn_offset_x*2;
xstart += character_spawn_offset_x*2;
y += character_spawn_offset_y*2;
ystart += character_spawn_offset_y*2;

this.vx = -0.5;
this.vy = 0;
this.sprite_dir = -1;
this.grounded = false;
this.dead = false;
this.dead_fade = 0;
this.dead_fade_max = 60;

this.vx_max = 2;
this.vy_max = 4;
this.gravity = 0.5;

this.image_speed_max = image_speed = 0.1;

this.die = function(how=0) {
	if(!this.dead) {
		this.dead = true;
		if(how == 1) {
			spawn_corpse(x, y, sprite_index, sprite_dir);
			instance_destroy();
			return;
		}
		sprite_index = s_enemy_rathuge_dead;
		this.vx = 0;
		this.dead_fade = 0;
	}
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(game_paused) return;
if(x > room_viewport_x+room_viewport_width) return;
if( y + 16 > room_height ) instance_destroy();
if(x < room_viewport_x-64) instance_destroy();

if(place_meeting(x-this.vx, y, o_dev_solid) != null || place_meeting(x+this.vx, y, o_dev_solid) != null) { this.vx = -this.vx; this.sprite_dir = -this.sprite_dir}
this.vy += this.gravity;
if(place_meeting(x, y+this.vy, o_dev_solid) != null) {
	this.vy = 0;
	image_speed = this.image_speed_max;
} else {
	image_speed = 0;
}


if(this.vx > this.vx_max) this.vx = this.vx_max;
if(this.vx < -this.vx_max) this.vx = -this.vx_max;

if(this.dead) {
	if(this.dead_fade >= this.dead_fade_max) instance_destroy();
	this.dead_fade += 1;
}

// Trampoline interaction
let trmp = place_meeting(x, y+2, o_trampoline);
if(trmp == null) trmp = place_meeting(x, y-2, o_trampoline); 
if(trmp != null) {
	sound_c_play(snd_trampoline);
	this.vy = (-8)*trmp.dir;
	trmp.image_speed = 0.5;
}

x += this.vx;
y += this.vy;
}
};
this.on_end_step = function() {
with(this) {

}
};
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, o_enemy_spikes);
if(this.other != null) {
this.die(1);
}
this.other = this.place_meeting(this.x, this.y, o_enemy_cactus);
if(this.other != null) {
this.die(1);
}
this.other = this.place_meeting(this.x, this.y, o_enemy_crusher);
if(this.other != null) {
this.die();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(sprite_index, image_index, ceil(x), ceil(y), 1*this.sprite_dir, 1, 0, 1);
}
}
};
}; var o_enemy_rathuge = new __o_enemy_rathuge();

function __o_platform_lift() {
__instance_init__(this, o_platform_lift, null, 1, 0, s_platform, 1, 179);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
let platform = instance_create(x, y, o_platform);
platform.vy = 0;
platform.vx = 0;
platform.static = false;
platform.fall = true;
platform.wrap = false;
platform.fallspeed = -2;
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_platform_lift = new __o_platform_lift();

function __o_bl_groundalt() {
__instance_init__(this, o_bl_groundalt, null, 1, 0, s_woodenblock, 1, 180);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_groundalt, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_groundalt = new __o_bl_groundalt();

function __o_bl_metal() {
__instance_init__(this, o_bl_metal, null, 1, 0, s_woodenblock, 1, 181);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_metal, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_metal = new __o_bl_metal();

function __o_conveyor_l() {
__instance_init__(this, o_conveyor_l, null, 1, 0, s_conveyor_l, 1, 182);
this.on_creation = function() {
with(this) {
this.bound = false;
image_speed = 0.1;
instance_create(x, y, o_dev_solid);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
if(x < room_viewport_x-64) instance_destroy();
if(!this.bound) {
	if(place_meeting(x-16, y, o_conveyor_l) != null) {
		if(place_meeting(x+16, y, o_conveyor_l) != null) {
			sprite_index = s_conveyor_m;
		} else sprite_index = s_conveyor_r;
	} else sprite_index = s_conveyor_l;
	this.bound = true;
}
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(sprite_index, image_index, x, y+16, 1, -1, 0, 1);
}
}
};
}; var o_conveyor_l = new __o_conveyor_l();

function __o_conveyor_r() {
__instance_init__(this, o_conveyor_r, null, 1, 0, s_conveyor_r, 1, 183);
this.on_creation = function() {
with(this) {
this.bound = false;
image_speed = 0.1;
instance_create(x, y, o_dev_solid);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
if(x < room_viewport_x-64) instance_destroy();
if(this.bound) return;
if(place_meeting(x-16, y, o_conveyor_r)) {
	if(place_meeting(x+16, y, o_conveyor_r)) {
		sprite_index = s_conveyor_m;
	} else sprite_index = s_conveyor_r;
} else sprite_index = s_conveyor_l;
this.bound = true;
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_conveyor_r = new __o_conveyor_r();

function __o_gamepad_test() {
__instance_init__(this, o_gamepad_test, null, 1, 0, s_dev_unknown, 1, 214);
this.on_creation = function() {
with(this) {

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {

}
}
};
}; var o_gamepad_test = new __o_gamepad_test();

function __o_bl_pipe() {
__instance_init__(this, o_bl_pipe, null, 1, 0, s_woodenblock, 1, 216);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
image_speed = 0;
image_index = 0;

this.hor = 0;
this.ver = 0;
this.bls = 16;

if(y == 0) instance_create(x, y-this.bls, object_index);
if(y == room_height-this.bls) instance_create(x, y+this.bls, object_index);

if(place_meeting(x+this.bls, y, object_index)){this.hor = 1}
if(place_meeting(x-this.bls, y, object_index))
{
    if(this.hor == 1){this.hor = 2}
    else{this.hor = 3}
}

if(place_meeting(x, y+this.bls, object_index)){this.ver = 1}
if(place_meeting(x, y-this.bls, object_index))
{
    if(this.ver == 1){this.ver = 2}
    else{this.ver = 3}
}

image_index = 4*this.ver + this.hor;
tile_add(ts_pipe, image_index*this.bls, 0, this.bls, this.bls, x, y, 1);
if(!(y + 16 >= room_height && image_index == 14)) {
	if(image_index != 10) instance_create(x, y, o_dev_solid);
}
instance_destroy();
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_bl_pipe = new __o_bl_pipe();

function __o_enemy_crush_up() {
__instance_init__(this, o_enemy_crush_up, null, 1, 0, s_enemy_crusher, 1, 238);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_enemy_crush_up = new __o_enemy_crush_up();

function __o_enemy_ratheli_stay() {
__instance_init__(this, o_enemy_ratheli_stay, null, 1, 0, s_enemy_rat, 1, 239);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
let newrat = instance_create(x, y, o_enemy_ratheli);
newrat.vx = 0;
newrat.vy_max = 0.05;
newrat.vy_dir = 0.01;
instance_destroy();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var o_enemy_ratheli_stay = new __o_enemy_ratheli_stay();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __sc_init() { 
this.tiles = [
[1000000,
[ts_brick,
[0,0,1,1,16,48]]]];
this.objects = [
[{o:o_hud, x:0, y:0}]];
this.start = function() {
__room_start__(this, sc_init, 320, 160, 60, 255, 255, 255, null, 0, 0, 0, 320, 160, null, 50, 50);

if(typeof dispconfLoad !== "undefined") {
	dispconfLoad();
}

room_goto_next();
};
}
var sc_init = new __sc_init();
tu_scenes.push(sc_init);
function __sc_game() { 
this.tiles = [
];
this.objects = [
[{o:o_kot, x:80, y:96}],
[{o:o_camera, x:124, y:0}],
[{o:o_hud, x:0, y:16}],
[{o:o_world_generator, x:0, y:0}],
[{o:o_gamepad_test, x:0, y:32}]];
this.start = function() {
__room_start__(this, sc_game, 500000, 160, 60, 255, 255, 255, null, 1, 1, 0, 320, 160, o_camera, 320, 160);

if(typeof dispconfLoad !== "undefined") {
	dispconfLoad();
}
};
}
var sc_game = new __sc_game();
tu_scenes.push(sc_game);
function __sc_prototype() { 
this.tiles = [
];
this.objects = [
[{o:o_kot, x:64, y:112}],
[{o:o_hud, x:0, y:0}],
[{o:o_bl_ground, x:384, y:80}],
[{o:o_bl_ground, x:384, y:48}],
[{o:o_bl_ground, x:384, y:32}],
[{o:o_bl_ground, x:384, y:16}],
[{o:o_bl_ground, x:384, y:0}],
[{o:o_bl_ground, x:400, y:48}],
[{o:o_bl_ground, x:416, y:48}],
[{o:o_bl_ground, x:400, y:80}],
[{o:o_bl_ground, x:400, y:96}],
[{o:o_bl_ground, x:400, y:112}],
[{o:o_bl_ground, x:416, y:112}],
[{o:o_bl_ground, x:432, y:64}],
[{o:o_bl_ground, x:432, y:80}],
[{o:o_bl_ground, x:432, y:48}],
[{o:o_bl_ground, x:432, y:112}],
[{o:o_bl_ground, x:448, y:112}],
[{o:o_bl_ground, x:464, y:112}],
[{o:o_bl_ground, x:464, y:96}],
[{o:o_bl_ground, x:464, y:80}],
[{o:o_bl_ground, x:464, y:64}],
[{o:o_bl_ground, x:480, y:64}],
[{o:o_bl_ground, x:464, y:32}],
[{o:o_bl_ground, x:480, y:32}],
[{o:o_bl_ground, x:464, y:16}],
[{o:o_bl_ground, x:448, y:16}],
[{o:o_bl_ground, x:432, y:16}],
[{o:o_bl_ground, x:416, y:16}],
[{o:o_bl_ground, x:496, y:32}],
[{o:o_bl_ground, x:496, y:64}],
[{o:o_bl_ground, x:464, y:128}],
[{o:o_bl_ground, x:464, y:144}],
[{o:o_bl_ground, x:480, y:144}],
[{o:o_bl_ground, x:512, y:144}],
[{o:o_bl_ground, x:496, y:80}],
[{o:o_bl_ground, x:496, y:96}],
[{o:o_bl_ground, x:480, y:128}],
[{o:o_bl_ground, x:496, y:128}],
[{o:o_bl_ground, x:512, y:128}],
[{o:o_bl_ground, x:544, y:128}],
[{o:o_bl_ground, x:528, y:128}],
[{o:o_bl_ground, x:528, y:112}],
[{o:o_bl_ground, x:528, y:96}],
[{o:o_bl_ground, x:544, y:96}],
[{o:o_bl_ground, x:512, y:32}],
[{o:o_bl_ground, x:528, y:32}],
[{o:o_bl_ground, x:528, y:64}],
[{o:o_bl_ground, x:544, y:64}],
[{o:o_bl_ground, x:528, y:48}],
[{o:o_bl_ground, x:560, y:64}],
[{o:o_bl_ground, x:560, y:96}],
[{o:o_bl_ground, x:576, y:96}],
[{o:o_bl_ground, x:592, y:96}],
[{o:o_bl_ground, x:560, y:48}],
[{o:o_bl_ground, x:560, y:32}],
[{o:o_bl_ground, x:592, y:64}],
[{o:o_bl_ground, x:592, y:48}],
[{o:o_bl_ground, x:592, y:32}],
[{o:o_bl_ground, x:592, y:16}],
[{o:o_bl_ground, x:592, y:16}],
[{o:o_bl_ground, x:592, y:0}],
[{o:o_bl_ground, x:576, y:0}],
[{o:o_bl_ground, x:576, y:0}],
[{o:o_bl_ground, x:560, y:0}],
[{o:o_bl_ground, x:544, y:0}],
[{o:o_bl_ground, x:544, y:0}],
[{o:o_bl_ground, x:544, y:0}],
[{o:o_bl_ground, x:528, y:0}],
[{o:o_bl_ground, x:512, y:0}],
[{o:o_bl_ground, x:496, y:0}],
[{o:o_bl_ground, x:496, y:0}],
[{o:o_bl_ground, x:480, y:0}],
[{o:o_bl_ground, x:608, y:96}],
[{o:o_bl_ground, x:608, y:64}],
[{o:o_bl_ground, x:624, y:64}],
[{o:o_bl_ground, x:640, y:64}],
[{o:o_bl_ground, x:640, y:80}],
[{o:o_bl_ground, x:640, y:96}],
[{o:o_bl_ground, x:640, y:128}],
[{o:o_bl_ground, x:624, y:128}],
[{o:o_bl_ground, x:608, y:128}],
[{o:o_bl_ground, x:608, y:128}],
[{o:o_bl_ground, x:592, y:128}],
[{o:o_bl_ground, x:560, y:128}],
[{o:o_bl_ground, x:576, y:128}],
[{o:o_bl_ground, x:640, y:128}],
[{o:o_bl_ground, x:656, y:128}],
[{o:o_bl_ground, x:672, y:128}],
[{o:o_bl_ground, x:688, y:128}],
[{o:o_bl_ground, x:688, y:128}],
[{o:o_bl_ground, x:704, y:128}],
[{o:o_bl_ground, x:704, y:128}],
[{o:o_bl_ground, x:704, y:128}],
[{o:o_bl_ground, x:656, y:96}],
[{o:o_bl_ground, x:688, y:96}],
[{o:o_bl_ground, x:688, y:80}],
[{o:o_bl_ground, x:688, y:64}],
[{o:o_bl_ground, x:672, y:64}],
[{o:o_bl_ground, x:672, y:48}],
[{o:o_bl_ground, x:672, y:32}],
[{o:o_bl_ground, x:656, y:32}],
[{o:o_bl_ground, x:640, y:32}],
[{o:o_bl_ground, x:624, y:32}],
[{o:o_bl_ground, x:624, y:0}],
[{o:o_bl_ground, x:640, y:0}],
[{o:o_bl_ground, x:656, y:0}],
[{o:o_bl_ground, x:672, y:0}],
[{o:o_bl_ground, x:688, y:0}],
[{o:o_bl_ground, x:704, y:0}],
[{o:o_bl_ground, x:704, y:16}],
[{o:o_bl_ground, x:704, y:32}],
[{o:o_bl_ground, x:704, y:32}],
[{o:o_bl_ground, x:720, y:32}],
[{o:o_bl_ground, x:720, y:48}],
[{o:o_bl_ground, x:720, y:48}],
[{o:o_bl_ground, x:720, y:64}],
[{o:o_bl_ground, x:720, y:80}],
[{o:o_bl_ground, x:720, y:96}],
[{o:o_bl_ground, x:720, y:96}],
[{o:o_bl_ground, x:720, y:96}],
[{o:o_bl_ground, x:720, y:128}],
[{o:o_bl_ground, x:736, y:128}],
[{o:o_bl_ground, x:752, y:128}],
[{o:o_bl_ground, x:752, y:112}],
[{o:o_bl_ground, x:752, y:96}],
[{o:o_bl_ground, x:752, y:80}],
[{o:o_bl_ground, x:768, y:80}],
[{o:o_bl_ground, x:736, y:48}],
[{o:o_bl_ground, x:752, y:48}],
[{o:o_bl_ground, x:768, y:48}],
[{o:o_bl_ground, x:368, y:80}],
[{o:o_bl_metal, x:192, y:128}],
[{o:o_bl_metal, x:192, y:144}],
[{o:o_bl_metal, x:208, y:144}],
[{o:o_bl_metal, x:192, y:128}],
[{o:o_bl_metal, x:208, y:128}],
[{o:o_bl_metal, x:224, y:128}],
[{o:o_bl_metal, x:224, y:144}],
[{o:o_bl_metal, x:208, y:144}],
[{o:o_bl_metal, x:192, y:144}],
[{o:o_bl_metal, x:240, y:128}],
[{o:o_bl_metal, x:240, y:144}],
[{o:o_bl_metal, x:256, y:144}],
[{o:o_bl_metal, x:256, y:128}],
[{o:o_bl_metal, x:256, y:112}],
[{o:o_bl_metal, x:256, y:112}],
[{o:o_bl_metal, x:272, y:112}],
[{o:o_bl_metal, x:272, y:128}],
[{o:o_bl_metal, x:272, y:144}],
[{o:o_bl_metal, x:272, y:144}],
[{o:o_bl_metal, x:320, y:144}],
[{o:o_bl_metal, x:368, y:144}],
[{o:o_bl_metal, x:368, y:128}],
[{o:o_conveyor_l, x:352, y:128}],
[{o:o_conveyor_l, x:336, y:128}],
[{o:o_conveyor_l, x:320, y:128}],
[{o:o_conveyor_l, x:304, y:128}],
[{o:o_conveyor_l, x:288, y:128}],
[{o:o_conveyor_r, x:208, y:112}],
[{o:o_conveyor_r, x:224, y:112}],
[{o:o_conveyor_r, x:240, y:112}],
[{o:o_bl_groundalt, x:16, y:128}],
[{o:o_bl_groundalt, x:0, y:128}],
[{o:o_bl_groundalt, x:0, y:144}],
[{o:o_bl_groundalt, x:16, y:144}],
[{o:o_bl_groundalt, x:32, y:144}],
[{o:o_bl_groundalt, x:32, y:128}],
[{o:o_bl_groundalt, x:48, y:128}],
[{o:o_bl_groundalt, x:48, y:144}],
[{o:o_bl_groundalt, x:64, y:144}],
[{o:o_bl_groundalt, x:64, y:128}],
[{o:o_bl_groundalt, x:80, y:128}],
[{o:o_bl_groundalt, x:80, y:144}],
[{o:o_bl_groundalt, x:96, y:144}],
[{o:o_bl_groundalt, x:96, y:128}],
[{o:o_bl_groundalt, x:144, y:128}],
[{o:o_bl_groundalt, x:144, y:128}],
[{o:o_bl_groundalt, x:144, y:144}],
[{o:o_bl_groundalt, x:160, y:144}],
[{o:o_bl_groundalt, x:160, y:128}],
[{o:o_bl_groundalt, x:176, y:128}],
[{o:o_bl_groundalt, x:176, y:144}]];
this.start = function() {
__room_start__(this, sc_prototype, 3200, 160, 60, 255, 255, 255, null, 1, 1, 0, 320, 160, o_kot, 320, 50);

if(typeof dispconfLoad !== "undefined") {
	dispconfLoad();
}
};
}
var sc_prototype = new __sc_prototype();
tu_scenes.push(sc_prototype);
tu_room_to_go = sc_init;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/
var last_score = load_web_integer("la");
if(!last_score) last_score = 0;
var high_score = load_web_integer("hi");
if(!high_score) high_score = 0;


var game_started = false;
var game_paused = false;
var game_expert = false;
var player_object;
var player_character;
var camera_object;
var world_generator_object;
var hud_object;
var game_timer = 0;
var despawn_margin = 32;
var player_death_margin = 16;

var player_costumes = {
	"default": s_kot,
	"fat": s_kot_fat,
	"tall": s_kot_tall,
	"girl": s_kot_girl,
	"hat": s_kot_hat,
	"sak1": s_kot_sak,
	"sak2": s_kot_sak_old,
	"agent": s_kot_agent,
	"soup": s_kot_soup,
	"burnt": s_kot_burnt,
	"troll": s_kot_troll,
};

if(!change_costume(load_web_string("costume"))) player_character = s_kot;

var character_spawn_offset_x = 4;
var character_spawn_offset_y = 2;
var mobile_controls_enabled = false;


var gpad_active = 0;
function gpadButton(num=-1) {
	if (num == -1) return false;
	if (!navigator.getGamepads()[0]) return false;
	return navigator.getGamepads()[0].buttons[num].pressed
}


var k_jump = vk_space;
var k_up = vk_up;
var k_left = vk_left;
var k_right = vk_right;
var k_down = vk_down;
var k_pause = vk_enter;
var k_expert = vk_e;

tu_unpausekey = k_pause;

var camera_speed_start = 1.2;
var camera_speed_expert = 1.5;
var camera_speedup_interval = 110;
var camera_speedup_increment = 3;
var camera_speedup_speed = 0.05;
var camera_speedup_maxspeed = 2.3;
var camera_speedup_stage2trigger = 1.65;
var camera_speedup_stage2increment = 240;
var camera_debug_speed = 2;

var game_meta_author = "micai";
var game_meta_version = "0.10-wip";
var debug = false;
var debug_showsolids = false;
var sound_enabled = true;

tu_preloader_showtext = false;
tu_preloader_bgcolor = "rgb(255, 255, 255)";
tu_preloader_barbg = "rgb(255, 255, 255)";
tu_preloader_barstroke = "rgb(0, 0, 0)";
tu_preloader_barfill = "rgb(0, 0, 0)";

tu_canvas_css = "background: rgb(255, 255, 255); border: 0;";


// FUNNY OVERRIDES OF ENGINE'S FUNCTIONS
function __mousemovelistener__(_e) {
	let _r = tu_canvas.getBoundingClientRect();
	mouse_x = ((_e.clientX - _r.left)/(_r.right - _r.left)) * tu_canvas.width;
	mouse_y = ((_e.clientY - _r.top)/(_r.bottom - _r.top)) * tu_canvas.height;
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};

/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/
// - - PREFAB SYSTEM - - 
var prefab_len_last = 0;
var prefab_len_total = 0;
var previous_prefab;
var prefab_ceiling = "";
var previous_bank;

var prefab_chars = {
	// blocks
	"G": o_bl_ground,
	"B": o_bl_brick,
	"C": o_bl_cloud,
	"R": o_bl_cave,
	"W": o_bl_woodenblock,
	"S": o_bl_sand,
	"Z": o_bl_bigbrick,
	"T": o_bl_tree,
	"L": o_bl_panel,
	"D": o_bl_wood,
	"H": o_bl_huge,
	"J": o_bl_woodenhuge,
	"F": o_bl_groundalt,
	"M": o_bl_metal,
	"P": o_bl_pipe,
	
	// enemies
	"r": o_enemy_rat,
	"s": o_enemy_spikes,
	"f": o_enemy_ratheli,
	"d": o_enemy_ratheli_stay,
	"k": o_enemy_cactus,
	"p": o_enemy_crusher,
	"m": o_enemy_missile,
	"g": o_enemy_rathuge,
	
	// bonus
	"c": o_coin,
	"t": o_trampoline,
	
	// vehicles
	"h": o_veh_heli,
	"n": o_sign_noheli,
	
	// platforms
	"<": o_platform_move_l,
	">": o_platform_move_r,
	"^": o_platform_move_u,
	"v": o_platform_move_d,
	"=": o_platform,
	"-": o_platform_fall,
	"+": o_platform_lift,
	"|": o_platform_reverse,
	
	// conveyor belts
	"(": o_conveyor_l,
	")": o_conveyor_r
	
};

function prefab_deploy(px, py, prefab, gap = 0, gapcei = "") { 
	//console.time("prefab deploy time");
	var content = prefab.content;
	if(prefab.content_alt != null) {
		if(Math.random() > 0.5) content = prefab.content_alt;
	}
	var len = content.length;
	var cx = 0;
	var cy = 0;
	var ce = "";
	prefab_len_last = 0;
	for(i=0; i<=len; i++) {
		ce = content[i]
		if(ce == ".") cx += 1;
		else if (ce == ",") {
			if(cx > prefab_len_last) prefab_len_last = cx;
			cx = 0; 
			cy += 1;
		}
		else if (ce in prefab_chars) {
			prefab_newent(px+cx, py+cy, prefab_chars[ce]);
			cx += 1;
		}
	}
	//prefab_len_last += gap;
	prefab_len_total += prefab_len_last;
	prefab_deploy_empty(prefab_len_total, gap, gapcei);
	previous_prefab = prefab;
	//console.timeEnd("prefab deploy time");
}

function prefab_deploy_empty(px, len, cei="") {
	prefab_len_total += len;
	if(cei == "") return;

	var cx = 0;
	var cy = 0;
	var ce = 0;
	for(i=0; i<cei.length; i++) {
		if(!cei[i] in prefab_chars) continue;
		var cur = prefab_chars[cei[i]];
		cx = 0;
		for(j=0; j<len; j++) {
			prefab_newent(px+cx, cy, cur);
			cx += 1;
		}
		cy += 1;
	}
}

function prefab_bank(name="newbank") {
	this.name = name;
	this.length_min = 3;
	this.length_max = 5;
	this.gap_min = 2;
	this.gap_max = 4;
	this.ceiling = "";
	this.repeat = true;
	this.start = [];
	this.middle = [];
	this.end = [];
	this.hard = [];
	this.rare = [];
};

function prefab(bank, tags, content) {
	this.bank = bank;
	this.tags = tags;
	this.content = content;
	this.content_alt = null;
}

// Prefabs

var pr_spawnpoint = new prefab(0, 0, "\
,,,,\
...............c.c.c,\
..............GGGGGGG.,\
..............GGGGGGG.,\
.GGGGGGGGGG...GGGGGGG.,\
.GGGGGGGGGG...GGGGGGG.,\
.GGGGGGGGGG...GGGGGGG.,\
");

var pr_spawnpoint_short = new prefab(0, 0, "\
,,,,,,,\
.GGGGGG,\
.GGGGGG,\
.GGGGGG,\
");



// GRASS 1
var pr_grass1_m1 = new prefab(0, 0, "\
,,,,\
................r,\
..........sGGGGGG,\
......r...GGGGGGG,\
sGGGGGG...GGGGGGG,\
GGGGGGG...GGGGGGG,\
GGGGGGG...GGGGGGG,\
");
var pr_grass1_m2 = new prefab(0, 0, "\
............DDDDDDDDDD,\
..................cDDD,\
...................DDD,\
............DDDDD..DDD,\
............DDDc...DDD,\
......DDD...DDD....DDD,\
......DDD...DDD..DDDDD,\
DDD...DDD...DDD,\
DDD...DDD...DDD...........DDD,\
DDD...DDD...DDDDDDDDDDD...DDD,\
");
pr_grass1_m2.content_alt = "\
.DDDDDDDDDD,\
.DDDc,\
.DDD,\
.DDD..DDDDD,\
.DDD...cDDD,\
.DDD....DDD,\
.DDDDD..DDD,\
........DDD,\
........DDD,\
DDDDDDD.DDD,\
";

var pr_grass1_m3 = new prefab(0, 0, "\
,\
..........c.....c,\
,\
,\
,\
.................GGG,\
.................GGG,\
.................GGG,\
.........t.......GGG,\
GGGGGGGGGGG......GGG..\
");
var pr_grass1_m4 = new prefab(0, 0, "\
................GGG,\
................GGG,\
,\
,\
,\
........c.c.....GGG,\
......sGGGGGs...GGG,\
......GGGGGGG...GGG,\
GGG...GGGGGGG...GGG,\
GGG...GGGGGGG...GGG,\
");
var pr_grass1_m5 = new prefab(0, 0, "\
,\
,\
,\
....c,\
....s,\
....W,\
....W....,\
....W....,\
GGGGGGGGG,\
GGGGGGGGG,\
");
var pr_grass1_m6 = new prefab(0, 0, "\
,\
,\
,\
,\
,\
..........c,\
,\
........W...W,\
GGGGG...W...W...GGGGG,\
GGGGG...W...W...GGGGG,\
");
pr_grass1_m6.content_alt = "\
,\
,\
,\
,\
..........c,\
,\
........W...W,\
GGGGG...W...W...GGGGG,\
GGGGG...W...W...GGGGG,\
GGGGG...W...W...GGGGG,\
";
var pr_grass1_m7 = new prefab(0, 0, "\
,\
,\
,\
,\
............c,\
................W,\
............W...W........r,\
........W...W...W...GGGGGG,\
........W...W...W...GGGGGG,\
GGGGG...W...W...W...GGGGGG,\
");
var pr_grass1_m8 = new prefab(0, 0, "\
,\
,\
,\
,\
,\
,\
,\
,\
GGGGG....t......t.,\
GGGGG....W......W.,\
");

var pbank_grass1 = new prefab_bank("grass1");
pbank_grass1.length_min = 2;
pbank_grass1.length_max = 3;
pbank_grass1.gap_min = 3;
pbank_grass1.gap_max = 4;
pbank_grass1.repeat = false;
pbank_grass1.middle = [ pr_grass1_m1, pr_grass1_m2, pr_grass1_m3, pr_grass1_m4, pr_grass1_m5, pr_grass1_m6, pr_grass1_m7, pr_grass1_m8 ];


// CASTLE 1
var pr_castle1_s1 = new prefab(0, 0, "\
............BBBBBBBBBBBBBBBBB,\
..................cBBB,\
...................BBB,\
............BBBBB..BBB,\
............BBBc...BBB,\
......BBB...BBB....BBB,\
......BBB...BBB..BBBBB,\
BBB...BBB...BBB,\
BBB...BBB...BBB...........BBB,\
BBB...BBB...BBBBBBBBBBB...BBB,\
");
var pr_castle1_s2 = new prefab(0, 0, "\
.............BBBBBBBBBBBBBBBBBBBBBB,\
.............BBBc...............BBB,\
.............BBB................BBB,\
.............BBB..BBBBB,\
.............BBB...cBBBBBBBBB,\
.............BBB....BBB......,\
.............BBBBB..BBB.........BBB,\
....................BBB.....c...BBB,\
BBB.................BBB...BBB...BBB,\
BBB...BBB...BBBBBBBBBBB...BBB...BBB,\
");
var pr_castle1_s3 = new prefab(0, 0, "\
........BBBBBBBBBBBBBBB,\
.................s,\
................c,\
...............s,\
..........BBBBBBBBBB,\
.................s,\
,\
BBB............s,\
BBB.....BBBBBBBBBBBBBB,\
BBB.....BBBBBBBBBBBBBB,\
");
var pr_castle1_m1 = new prefab(0, 0, "\
BBBBBBBBBBBBBBBBBBB,\
,\
......B.....B,\
....BBBBBBBBBBB,\
.........s,\
,\
........c.c,\
BBBBBBssBBBssBBBBBB,\
BBBBBBBBBBBBBBBBBBB,\
BBBBBBBBBBBBBBBBBBB,\
");
var pr_castle1_m2 = new prefab(0, 0, "\
BBBBBBBBBBBBBBBBBBBBBBBBBBB,\
......W......W......W,\
......s......s......s,\
.....................,\
......c......c......c,\
......s.............s,\
......W......s......W,\
......W......W......W,\
BBBBBBBBBBBBBBBBBBBBBBBBBBB,\
BBBBBBBBBBBBBBBBBBBBBBBBBBB,\
");
var pr_castle1_m3 = new prefab(0, 0, "\
BBBBBBBBBB....BBBBBBBBBBBB,\
............p...BBBBBBBBBB,\
..........................,\
..........................,\
.......................cc.,\
..........................,\
..........p...........BBBB,\
........BBBBBBBB......BBBB,\
BBBBBBBBBBBBBBBBBBBB..BBBB,\
BBBBBBBBBBBBBBBBBBBB..BBBB,\
");
var pr_castle1_m4 = new prefab(0, 0, "\
BBBBBBBB..BBBBBB..BBBBBBBBB,\
................p.....,\
......................,\
......................,\
......................,\
......................,\
........p.............,\
....BBBBBBBB..BBBBBBBB....,\
BBBBBBBBBBBB..BBBBBBBBBBBB,\
BBBBBBBBBBBB..BBBBBBBBBBBB,\
");
var pr_castle1_m5 = new prefab(0, 0, "\
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB,\
........................BBBB....BBB,\
........................BBBB....BBB,\
........................BBBB,\
...............BBBB.....BBBB,\
...............BBBB.....BBBB,\
...............BBBBss.csBBBB,\
...............BBBBBB..BBBBB,\
BBB........t...BBBBc............BBB,\
BBB...BBBBBB...BBBBBBBBBBBBBB...BBB,\
");
pr_castle1_m5.content_alt = "\
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB,\
........................BBBB....BBB,\
........................BBBB....BBB,\
........................BBBB,\
...............BBBB.....BBBB,\
...............BBBB.....BBBB,\
...............BBBBss.csBBBB,\
...............BBBBBB..BBBBB,\
BBB........t...BBBBc............BBB,\
BBB...BBBBBB...BBBBBBBBBBBBBB...BBB,\
";
var pr_castle1_m6 = new prefab(0, 0, "\
BBBBB............BBBBBBBBBBBBBBBBB,\
.......v....^............BBBB,\
.........................BBBB,\
.........................BBBB,\
.................BBBB........,\
.................BBBB,\
.......v....^....BBBB,\
.................BBBB....c....BBBB,\
BBBBB............BBBB.........BBBB,\
BBBBB............BBBB....B....BBBB,\
");
var pr_castle1_m7 = new prefab(0, 0, "\
BBBBBBBBBBBBBBBBBBBBBBBBBB..BB..BBBB,\
.................BBBBBBBBBp.BB..BB,\
.................BBBBBBBBB..BB..BB,\
.................BBBBBBBBB..BB..BB,\
..........BBBB-.BBBBBBBBBB..BB..BB,\
..........BBB....BBBBBBBBB..BB..BB,\
......c...BBB.c,\
..........BBB.................p,\
BBB...t...BBB.c..BBBB.BBBBBBBBBBBBBB,\
BBB...B...BBB....BBBB.BBBBBBBBBBBBBB,\
");


var pr_castle1_m8 = new prefab(0, 0, "\
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB,\
......W......W......W..........BB....BB,\
......s......W......s..........BB....BB,\
.............s.................BB....ss,\
......c.............c..........BB......,\
......s......c......s..........ss,\
......W......s......W................BB,\
......W......W......W................BB,\
BBBBBBBBBBBBBBBBBBBBBBBBBBB....BB....BB,\
BBBBBBBBBBBBBBBBBBBBBBBBBBB....BB....BB,\
");
var pbank_castle1 = new prefab_bank("castle1");
pbank_castle1.length_min = 3;
pbank_castle1.length_max = 5;
pbank_castle1.gap_min = 3;
pbank_castle1.gap_max = 4;
pbank_castle1.ceiling = "B";
pbank_castle1.repeat = false;
pbank_castle1.start = [pr_castle1_s1, pr_castle1_s2, pr_castle1_s3];
pbank_castle1.middle = [pr_castle1_m1, pr_castle1_m2, pr_castle1_m3, pr_castle1_m4, pr_castle1_m5, pr_castle1_m6, pr_castle1_m7, pr_castle1_m8];


// HELI LEVEL 1
var pr_heli1_s1 = new prefab(0, 0, "\
,\
,\
,\
,\
,\
,\
,\
.....h,\
GGGGGGG,\
GGGGGGG......,\
");
var pr_heli1_m1 = new prefab(0, 0, "\
.....GGG.....GGG.....GGG..,\
.....sss.....GGG.....GGG,\
.............GGG.....sss,\
......c......GGG.....,\
.............sss......c,\
.....sss.....,\
.....GGG......c......sss,\
.....GGG.............GGG,\
.....GGG.....sss.....GGG,\
.....GGG.....GGG.....GGG,\
");
var pr_heli1_m2 = new prefab(0, 0, "\
.....DDD.....DDD.....DDD..,\
.....DDD.....sss.....DDD,\
.....DDD.............sss,\
.....sss......c,\
......................c,\
......c......sss,\
.............DDD.....sss,\
.....sss.....DDD.....DDD,\
.....DDD.....DDD.....DDD,\
.....DDD.....DDD.....DDD,\
");
var pr_heli1_m3 = new prefab(0, 0, "\
..............CCCCCCCC.....................CCCCC,\
....f.........CCCCCCCC........f.....,\
,\
CCCCCCCCC.........f................f..................f,\
CCCCCCCCC...................CCCCCCCCC,\
............................CCCCCCCCC.......CCCCCCC,\
....f.......................................CCCCCCC,\
............CCCCCC............c...c,\
............CCCCCC............................c.c..,\
,\
");
var pr_heli1_m4 = new prefab(0, 0, "\
...m................CCCCCCCCC............CCC,\
................................m......................m,\
................m...................,\
..CCCC........................CCC...........m........,\
..CCCC.............................CCCCC...............,\
...................CCC.............CCCCC,\
..........CCCC..........m............................CCC,\
..........CCCC......................c.c,\
..........m.......................................m,\
,\
");
var pr_heli1_m5 = new prefab(0, 0, "\
.....CCC.....CCC.....CCC,\
.....CCC.....CCC.....CCC..............f,\
.....CCC.....CCC.......,\
.....CCC.....CCC.........,\
.....CCC..............c,\
.....CCC......................f,\
.....CCC.....CCC............,\
.............CCC.....CCC,\
......c......CCC.....CCC,\
.............CCC.....CCC,\
");
var pr_heli1_e1 = new prefab(0, 0, "\
,\
,\
,\
,\
,\
,\
,\
......n,\
....GGGGGGGG,\
....GGGGGGGG,\
");

var pbank_heli1 = new prefab_bank("heli1");
pbank_heli1.length_min = 2;
pbank_heli1.length_max = 3;
pbank_heli1.gap_min = 6;
pbank_heli1.gap_max = 7;
pbank_heli1.repeat = false;
pbank_heli1.start = [pr_heli1_s1];
pbank_heli1.middle = [pr_heli1_m1, pr_heli1_m2, pr_heli1_m3, pr_heli1_m4, pr_heli1_m5];
pbank_heli1.end = [pr_heli1_e1];


// DESERT 1
var pr_desert1_m1 = new prefab(0, 0, "\
,\
,\
,\
..................k,\
......c...........k.....k,\
..................k.....k,\
......k.......SSSSSSSSSSSSS..........r,\
......k.r.....SSSSSSSSSSSSS......SSSSS,\
SSSSSSSSSSS...SSSSSSSSSSSSS......SSSSS,\
SSSSSSSSSSS...SSSSSSSSSSSSS......SSSSS,\
");
var pr_desert1_m2 = new prefab(0, 0, "\
,\
,\
,\
,\
............................k...k...k...k,\
.....k...k...k...k..........k...k...k...k,\
.....k...k...k...k..........k.c.k...k.c.k,\
.....k.c.k...k.c.k.......SSSSSSSSSSSSSSSSSSS,\
SSSSSSSSSSSSSSSSSSSSS....SSSSSSSSSSSSSSSSSSS,\
SSSSSSSSSSSSSSSSSSSSS....SSSSSSSSSSSSSSSSSSS,\
");
var pr_desert1_m3 = new prefab(0, 0, "\
,\
,\
,\
,\
..................k,\
.........k........k.....r,\
.........k...c....SSSSSSS,\
k...c....SSSSSS...SSSSSSS,\
SSSSSS...SSSSSS...SSSSSSS,\
SSSSSS...SSSSSS...SSSSSSS,\
");
var pr_desert1_m4 = new prefab(0, 0, "\
.........................c,\
..........................,\
.........................k,\
.........................k,\
.........................k,\
.........................k,\
....................c....k,\
.....r..................SSSSSSS,\
SSSSSS..............t...SSSSSSS,\
SSSSSS......SSSSSSSSS...SSSSSSS,\
");
var pr_desert1_m5 = new prefab(0, 0, "\
,\
,\
,\
,\
.............c,\
,\
,\
.....r....Z.....Z,\
SSSSSS....Z.....Z,\
SSSSSS....Z.....Z,\
");
var pr_desert1_m6 = new prefab(0, 0, "\
...................ZZZZZZZZZZZ,\
..........................cZZZ,\
...........................ZZZ,\
...................ZZZZZZ..ZZZ,\
............ZZ.....ZZZc....ZZZ,\
............ZZ.....ZZZ.....ZZZ.....c,\
......ZZ....ZZ.....ZZZ..ZZZZZZ,\
......ZZ....ZZ.....ZZZ.............k,\
ZZ....ZZ....ZZ.....ZZZ.............k,\
ZZ....ZZ....ZZ.....ZZZ.ZZZZZZZZ...SSSS,\
");
var pr_desert1_m7 = new prefab(0, 0, "\
,\
,\
.............................c,\
............c,\
........c...............r....Z,\
............k......SSSSSS....Z,\
........k...k......SSSSSS....Z,\
........k...k......SSSSSS....Z,\
SSSS....SSSSSSS....SSSSSS....Z,\
SSSS....SSSSSSS....SSSSSS....Z,\
");
var pr_desert1_m8 = new prefab(0, 0, "\
,\
,\
,\
,\
........................c,\
.............................c............r.....r,\
........r.....r....c....Z.........ZZZ...ZZZ...ZZZ,\
ZZZ...ZZZ...ZZZ.........Z....Z....ZZZZZZZZZZZZZZZ,\
ZZZZZZZZZZZZZZZ....Z....Z....Z....ZZZZZZZZZZZZZZZ,\
ZZZZZZZZZZZZZZZ....Z....Z....Z....ZZZZZZZZZZZZZZZ,\
");
var pr_desert1_m9 = new prefab(0, 0, "\
,\
,\
,\
................c,\
........c.....................c,\
................k..............,\
........k.......k.............k,\
........k......SSSS...........k,\
SSSS...SSSS....SSSS...........k......r,\
SSSS...SSSS....SSSS......SSSSSSSSSSSSS,\
");
var pr_desert1_m10 = new prefab(0, 0, "\
.......ZZZZZZ..........ZZZZZZ,\
.......ZZZ,\
.......ZZZ,\
..............v.....^,\
.........................ZZZZ,\
........c.................ZZZ,\
.......ZZZ................ZZZ,\
.......ZZZ................ZZZ,\
ZZZZ...ZZZ....v.....^.....ZZZ,\
ZZZZ...ZZZ................ZZZ,\
");

var pbank_desert1 = new prefab_bank("desert1");
pbank_desert1.length_min = 4;
pbank_desert1.length_max = 8;
pbank_desert1.gap_min = 3;
pbank_desert1.gap_max = 4;
pbank_desert1.repeat = false;
pbank_desert1.middle = [pr_desert1_m1, pr_desert1_m2, pr_desert1_m3, pr_desert1_m4, pr_desert1_m5, pr_desert1_m6, pr_desert1_m7, pr_desert1_m8, pr_desert1_m9, pr_desert1_m10];

var pr_egg1_m1 = new prefab(0, 0, "\
,\
,\
,\
.......c...............g,\
........H.H,\
.......c...........H.H.H.H.,\
........H.H...............,\
.......t...........H.H.H.H,\
H.H.H.H.H.H....J..........,\
...................H.H.H.H,\
");

var pr_egg1_m2 = new prefab(0, 0, "\
..............................J..,\
,\
.....................g........J..,\
,\
........H.H......H.H.H.H.........,\
,\
....H.H.H.H......H.H.H.H......J.............J,\
,\
J...H.H.H.H......H.H.H.H......H.H.....J.....J,\
,\
");

var pr_egg1_m3 = new prefab(0, 0, "\
........c,\
,\
.......c..H.H....v.....^.....v.....^.....H.H,\
,\
........c.H.H............................H.H,\
,\
.......c..H.H............................H.H,\
.................v.....^.....v.....^,\
H.H.H..+..H.H............................H.H,\
,\
");

var pr_egg1_m4 = new prefab(0, 0, "\
,\
,\
...................g,\
,\
........g....H.H.H.H,\
,\
..H.H.H.H....H.H.H.H,\
,\
H.H.H.H.H....H.H.H.H,\
,\
");

var pr_egg1_m5 = new prefab(0, 0, "\
..................J.J.J.J.J.J.J.J.J.J.....J,\
...............c......................p,\
........................J.......J.J.J.....J,\
.........c,\
............J.....J.J...J...J...J.J.J.....J,\
...c,\
......J.....J.....J.........J...,\
........................................p.,\
J.....J.....J.....J.J...J.J.J...J.J.J.J.J.J.J,\
,\
");

var pr_egg1_m6 = new prefab(0, 0, "\
............H,\
,\
............H,\
,\
......H.....H,\
,\
...-..H...........H,\
.........cc,\
H.....H..J..H..-..H,\
,\
");

var pr_egg1_m0 = new prefab(0, 0, "\
.............................................,\
,\
.............................................,\
,\
.............................................,\
,\
.............................................,\
,\
.............................................,\
,\
");

var pbank_egg1 = new prefab_bank("egg1");
pbank_egg1.length_min = 3;
pbank_egg1.length_max = 4;
pbank_egg1.gap_min = 4;
pbank_egg1.gap_max = 4;
pbank_egg1.repeat = false;
pbank_egg1.middle = [pr_egg1_m1, pr_egg1_m2, pr_egg1_m3, pr_egg1_m4, pr_egg1_m5, pr_egg1_m6,];


var pr_cave1_s1 = new prefab(0, 0, "\
............RRRRRRRRRRR,\
..................cRRR,\
...................RRR,\
............RRRRR..RRR,\
............RRRc...RRR,\
......RRR...RRR....RRR,\
......RRR...RRR..RRRRR,\
RRR...RRR...RRR,\
RRR...RRR...RRR,\
RRR...RRR...RRR.RRRRRRR,\
");
var pr_cave1_s2 = new prefab(0, 0, "\
.......RRRRRRRRRRRRRRRRRRR,\
.......RRRRRRRRRRRRRRRRRRR,\
.......RRRRRRRRRRRRRRRRRRR,\
...............RRRRRRRRRRR,\
.................RRRRRRRRR,\
......RRRR.........RRRRRRR,\
......RRRR..RRR....RRRRR,\
RRR...RRRR..RRRs,\
RRR...RRRR..RRRRRR,\
RRR...RRRR..RRRRRRRRRRRRRR,\
");
var pr_cave1_m1 = new prefab(0, 0, "\
RRRRRRRRRRRRRRRRRRRRRRRRRRR,\
RRRRRRRRRRRRRR..........RRR,\
RRRRRRRRRRR.....c.......RRR,\
RRRRRRRRR........RRRR...RRR,\
................cRRRR...RRR,\
....c............RRRR,\
................cRRRR,\
.................RRRR....c,\
RRR...RRR.......tRRRR...RRR,\
RRR...RRR...RRRRRRRRR...RRR,\
");
var pr_cave1_m2 = new prefab(0, 0, "\
RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR,\
RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR,\
............RRRRRRR,\
................RRR,\
...........r..........RR......c,\
..........RR..........RR,\
.c..c.RRRRRRss..c.....RR,\
RRRRRRRRRRRRRRRRRRR...RR...RR...RR,\
RRRRRRRRRRRRRRRRRRR...RR...RR...RR,\
RRRRRRRRRRRRRRRRRRR...RR...RR...RR,\
");
var pr_cave1_m3 = new prefab(0, 0, "\
RRRRRRRRRRRRRRRRRRRRRRRRRRR,\
......R......R,\
......s......R,\
.............s,\
......c,\
......s......c,\
......R......s,\
......R......R...........r.,\
RRRRRRRRRRRRRRRRRRRRRRRRRRR,\
RRRRRRRRRRRRRRRRRRRRRRRRRRR,\
");
var pr_cave1_m4 = new prefab(0, 0, "\
RRRRRRRRRRRRRRRRRRRRR,\
RRRRR...RRRRR...RRRRR,\
RRRRR...sRRRs...RRRRR,\
RRRRs...........RRRRR,\
................RRRRR,\
..........c.....RRRR.,\
..c.....sRRRs,\
RRRRs...RRRRR.....c,\
RRRRR...RRRRR...RRRRR,\
RRRRR...RRRRR...RRRRR,\
");
var pr_cave1_m5 = new prefab(0, 0, "\
RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR,\
.......RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR,\
.......RR.................RRRRRRRRRRR,\
.......RR.................RRRRR,\
.RR...............RRRR....RRRRR,\
.RR...............RRRR....RRRRR,\
.RR..........RR...RRRR....RRRR,\
.RR....RR....RR...RRRR,\
tRR....RR....RR...RRRR....c.c.c...RRR,\
RRR....RR....RR...RRRR....RRRRR...RRR,\
");
var pr_cave1_m6 = new prefab(0, 0, "\
RRRRRRRRRR....RRRRRRRRRRRRRR,\
RRRRRRRR....p...RRRRRRRRRR,\
RRRRRRRR,\
RRRRRRR,\
,\
..........................RR,\
..........p.........RR....RR,\
........RRRRRRRR....RR....RR,\
RRRRRRRRRRRRRRRR....RR....RR,\
RRRRRRRRRRRRRRRR....RR....RR,\
");
var pr_cave1_m7 = new prefab(0, 0, "\
RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR,\
RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR,\
,\
,\
..............c,\
.........c..............c,\
..............R....c,\
.........R....R.........R,\
RRRRR....R....R....R....R....RR,\
RRRRR....R....R....R....R....RR,\
");
pr_cave1_m7.content_alt = "\
RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR,\
RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR,\
...................c.........RR,\
.............................RR,\
..............c....R,\
...................R....c,\
.........c....R....R,\
..............R....R....R,\
.........R....R....R....R....RR,\
RRRRR....R....R....R....R....RR,\
";

var pbank_cave1 = new prefab_bank("cave1");
pbank_cave1.length_min = 3;
pbank_cave1.length_max = 5;
pbank_cave1.gap_min = 3;
pbank_cave1.gap_max = 4;
pbank_cave1.ceiling = "R";
pbank_cave1.repeat = false;
pbank_cave1.start = [pr_cave1_s1, pr_cave1_s2];
pbank_cave1.middle = [pr_cave1_m1, pr_cave1_m2, pr_cave1_m3, pr_cave1_m4, pr_cave1_m5, pr_cave1_m6, pr_cave1_m7];

var pr_clouds1_m1 = new prefab(0, 0, "\
,\
,\
..........................................r,\
.....................................CCCCCCC,\
.....................r,\
......c..c....CCCCCCCCC,\
.....CCCCCC...CCCCCCCCC.......c...c............CCC,\
CC...CCCCCC.................CCCCCCCCC....cc....CCC,\
CC..........................CCCCCCCCC...CCCC,\
,\
");
var pr_clouds1_m2 = new prefab(0, 0, "\
,\
,\
,\
,\
,\
,\
..............CC,\
........C.....CC.........CC,\
CCCCC..............C.....CC,\
CCCCC,\
");
var pr_clouds1_m3 = new prefab(0, 0, "\
,\
,\
,\
.............CCCCC,\
.............CCCCC,\
...........................r,\
.......CCC.....c.c....CCCCCC,\
.......CCC.....CCC....CCCCCC.,\
CCC.........C..CCC,\
CCC,\
");
var pr_clouds1_m4 = new prefab(0, 0, "\
,\
................................r,\
..........................CCCCCCC,\
..........................CCCCCCC...c,\
....................................C,\
................................,\
.......................t................c,\
...................CCCCC................C,\
......r....C...C...CCCCC,\
CCCCCCC,\
");
var pr_clouds1_m5 = new prefab(0, 0, "\
,\
,\
,\
...............c..........CCCCCC,\
.....................c....CCCCCC,\
.........c.....t........,\
CCCC...........C.....t,\
CCCC.....t...........C...,\
.........C...............,\
,\
");

var pbank_clouds1 = new prefab_bank("clouds1");
pbank_clouds1.length_min = 4;
pbank_clouds1.length_max = 5;
pbank_clouds1.gap_min = 3;
pbank_clouds1.gap_max = 4;
pbank_clouds1.repeat = false;
pbank_clouds1.middle = [pr_clouds1_m1, pr_clouds1_m2, pr_clouds1_m3, pr_clouds1_m4, pr_clouds1_m5];

var pr_wood1_m1 = new prefab(0, 0, "\
.......DDDDDDDDDD,\
.......DDDc,\
.......DDD,\
.......DDD...DDDD,\
.......DDD...cDDD,\
.......DDD....DDD,\
.......DDDDD..DDD,\
..............DDD,\
..............DDD,\
DDD...DDDDDDD.DDD,\
");

var pr_wood1_m2 = new prefab(0, 0, "\
,\
,\
,\
................c,\
........c.....................c,\
................s.............s,\
........s.......W.............W,\
........W......DDDD...........W,\
DDDD...DDDD....DDDD...........W......r,\
DDDD...DDDD....DDDD......DDDDDDDDDDDDD,\
");

var pr_wood1_m3 = new prefab(0, 0, "\
.........DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD,\
.................DDD,\
.................DDD,\
.........DDD.....DDD.................DDDD...,\
.........DDD.....DDD..................DDD..DDD.....TTTTT,\
TTTTT....DDDss.csDDD.................cDDD..DDD.......T,\
..T......DDDDD..DDDD.................DDDD..DDD.......T,\
..T......DDD..........................DDD..DDD.......T,\
..T......DDD..............DD..........DDD..DDD.......T,\
..T......DDDDDDDDDDDDD....DD....DDDDDDDDD..DDD.......T,\
");

var pr_wood1_m4 = new prefab(0, 0, "\
..........................c,\
,\
.............................TTTTTTT,\
...............r................T,\
...........TTTTT................T,\
.............T..................T,\
.............T..........r.t.....T,\
.......t.....T......TTTTTTT.....T,\
DDDDDDDD.....T.........T........T,\
DDDDDDDD.....T.........T........T.\
");

var pr_wood1_m5 = new prefab(0, 0, "\
,\
................................r,\
............................TTTTT,\
....................D.........T......-.....-.....-,\
............TTT.....D.........T,\
.............T......D.........T,\
.......W.....T......D...c.....T,\
DDDDDDDD.....T......D.........T,\
DDDDDDDD.....T......D...t.....T,\
DDDDDDDD.....T......D...W.....T\
"); 
var pr_wood1_m6 = new prefab(0, 0, "\
..........W.W.W,\
..........t.t.t,\
,\
,\
,\
,\
,\
,\
DDDDD....t.t.t.t,\
DDDDD....W.W.W.W,\
");
var pr_wood1_m7 = new prefab(0, 0, "\
................DDDDDDDDDDDDDDDDDDDDD,\
................DDD...............DDD,\
................DDD...............DDD,\
................DDD......DDD......DDD,\
................DDD.......D..........,\
........c.......DDD......cDc,\
......sDDDs.....DDD......DDD......DDD,\
......DDDDD...............D.......DDD,\
DDD...DDDDD...............D.......DDD,\
DDD...DDDDD.....DDDDDDDDDDD...W...DDD,\
");

var pr_wood1_m8 = new prefab(0, 0, "\
..................................,\
..................................,\
..................................,\
.......TTTTT......................,\
.........T.....d....d....d........,\
.........T...................TTTTT,\
.........T.....................T..,\
....t....T.....................T..,\
TTTTT....T.....................T..,\
..T......T.....................T..");

var pbank_wood1 = new prefab_bank("wood1");
pbank_wood1.length_min = 4;
pbank_wood1.length_max = 5;
pbank_wood1.gap_min = 3;
pbank_wood1.gap_max = 4;
pbank_wood1.repeat = false;
pbank_wood1.middle = [pr_wood1_m1, pr_wood1_m2, pr_wood1_m3, pr_wood1_m4, pr_wood1_m5, pr_wood1_m6, pr_wood1_m7, pr_wood1_m8];

var pr_panel1_m1 = new prefab(0, 0, "\
.......................LLL........,\
.......................LLL........,\
.......................LLL........,\
.......................LLL........,\
................LLL.-..LLL........,\
................LLL....LLL........,\
........LLL.....LLL...............,\
........LLL.....LLL.....c........-,\
LLL.....LLL.....LLL..........-....,\
LLL.....LLL.....LLL....LLL........,\
");

var pr_panel1_m2 = new prefab(0, 0, "\
..............................LL,\
..............................LL,\
..............................LL,\
..................LL....-.....LL,\
..................LL..........LL,\
..................LL............,\
............LL....LL............,\
LL....-.....LL....LL............,\
LL..........LL....LL....cc....LL,\
LL....cc....LL....LL..........LL,\
"); 

var pbank_panel1 = new prefab_bank("panel1");
pbank_panel1.length_min = 1;
pbank_panel1.length_max = 2;
pbank_panel1.gap_min = 4;
pbank_panel1.gap_max = 4;
pbank_panel1.repeat = false;
pbank_panel1.middle = [pr_panel1_m1, pr_panel1_m2];


var pr_ground1_m1 = new prefab(0, 0, "\
..............,\
..............,\
......FF......,\
.......F......,\
......cF......,\
......FF.....c,\
.......F......,\
.......F.....F,\
F.F.FFFF.....F,\
FFFFFFFF.....F");

var pr_ground1_m2 = new prefab(0, 0, "\
.........FF,\
.........FF,\
.........FF,\
....FF...FF,\
....FF.c.FF,\
....FF.....,\
....FF.....,\
....FF.....,\
..t.FF...FF,\
FFF.FF...FF");

var pr_ground1_m3 = new prefab(0, 0, "\
........,\
........,\
........,\
........,\
......sF,\
......FF,\
..r...FF,\
FFF...FF,\
FFF...FF,\
FFF...FF");

var pr_ground1_m4 = new prefab(0, 0, "\
...............FF,\
...............FF,\
...............FF,\
...............FF,\
..........-....FF,\
...............FF,\
.....-...........,\
.................,\
-.........cc.....,\
...............FF");

var pr_ground1_m5 = new prefab(0, 0, "\
.....,\
.....,\
.....,\
.....,\
.....,\
.....,\
c...F,\
....F,\
F...F,\
F...F");

var pr_ground1_m6 = new prefab(0, 0, "\
......FF...........,\
......FF...........,\
..................r,\
......cc.......FFFF,\
......FF.......FFFF,\
...............FFFF,\
...............FFFF,\
..r............FFFF,\
FFF...FF...t...FFFF,\
FFF...FF...W...FFFF");

pr_ground1_m6.alt_content = "\
......FF...................,\
......FF...................,\
...........................,\
......cc.......FF...-....-.,\
......FF.......FF..........,\
...............FF..........,\
..r............FF..........,\
FFF............FF........cc,\
FFF...FF...t...FF..........,\
FFF...FF...W...FF..........";

var pbank_ground1 = new prefab_bank("ground1");
pbank_ground1.length_min = 4;
pbank_ground1.length_max = 5;
pbank_ground1.gap_min = 3;
pbank_ground1.gap_max = 3;
pbank_ground1.repeat = false;
pbank_ground1.middle = [pr_ground1_m1, pr_ground1_m2, pr_ground1_m3, pr_ground1_m4, pr_ground1_m5, pr_ground1_m6];

var pr_factory1_m1 = new prefab(0, 0, "\
MMMMMMMMMMMMMMMMMMMM..........MM,\
..............................MM,\
..............................MM,\
..................MM....-.....MM,\
..................MM..........MM,\
..................MM............,\
............MM....MM............,\
MM....-.....MM....MM............,\
MM..........MM....MM....cc....MM,\
MM....cc....MM....MM..........MM");

var pr_factory1_m2 = new prefab(0, 0, "\
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM,\
.......................MMM.........,\
.......................MMM.........,\
.......................MMM.........,\
................MMM.-..MMM.........,\
................MMM....MMM.........,\
.......)))))....MMM................,\
.......MMMMM....MMM.....c........-.,\
MMM....MMMMM....MMM..........-.....,\
MMM....MMMMM....MMM....MMM........."); 

var pr_factory1_m3 = new prefab(0, 0, "\
MMMMMMMMMMMMMMMMMMMMM,\
P....P....P....P....P,\
P....P....P....P....P,\
.....P.........P.....,\
.....P.........P.....,\
...............P.....,\
P....c....P.........P,\
P.........P....c....P,\
P....P....P.........P,\
P....P....P....P....P");

pr_factory1_m3.alt_content = "\
MMMMMMMMMMMMMMMMMMMMM,\
P....P....P....P....P,\
P....P....P....P....P,\
.....P.........P.....,\
.....P.........P.....,\
.....P...............,\
P.........P....c....P,\
P....c....P.........P,\
P.........P....P....P,\
P....P....P....P....P";

var pr_factory1_m4 = new prefab(0, 0, "\
MMMMMMMMMMMMMMMPMMMMMMMMMMMMMMMMM,\
..............cP.................,\
...............P.................,\
.........PPPP..P.................,\
..........Pc...P................r,\
..........P....P.............MMMM,\
.........PP..PPP........-....MMMM,\
..........P..................MMMM,\
...r......P........-.........MMMM,\
MMMM..MMMMPMMMMM.............MMMM");

var pr_factory1_m5 = new prefab(0, 0, "\
MMMMMM..............MMMMMMMMMMMMMMMMMMMM,\
......p.......p.....................MMMM,\
....................................MMMM,\
....................................MMMM,\
..............................MM........,\
........................MM....MM........,\
..........p.............MM....MM........,\
..MMMM))))))))))MMMM....MM....MM....c...,\
MMMMMMMMMMMMMMMMMMMMMM..MM....MM.......P,\
MMMMMMMMMMMMMMMMMMMMMM..MM....MM....P..P");

var pr_factory1_m6 = new prefab(0, 0, "\
MMMMMMMMMMMMPMMMMMMM......................MMMM,\
............P.................................,\
............P.................................,\
............P..c........^.....v.....^.........,\
............PPPP..........................PPPP,\
...............P..........................P..P,\
...............P..........................P..P,\
PPPPP..............P......................P..P,\
P...P....PP........P....^.....v.....^.....P..P,\
P...P.....P....P...P......................P..P");

var pbank_factory1 = new prefab_bank("factory1");
pbank_factory1.length_min = 4;
pbank_factory1.length_max = 5;
pbank_factory1.gap_min = 3;
pbank_factory1.gap_max = 3;
pbank_factory1.repeat = false;
pbank_factory1.ceiling = "M";
pbank_factory1.middle = [pr_factory1_m1, pr_factory1_m2, pr_factory1_m3, pr_factory1_m4, pr_factory1_m5, pr_factory1_m6];

var prefab_bank_first = pbank_grass1;
var prefab_testing = null;
var prefab_bank_testing = null;
//var prefab_list = [pr_simple1, pr_simple2, pr_simple3, pr_simple4, pr_simple5, pr_simple6, pr_simple7, pr_simple8, pr_castle1, pr_castle2, pr_castle3, pr_castle4, pr_castle4, pr_castle5, pr_cave2, pr_cave1, pr_cave3, pr_clouds1, pr_clouds2];

var test_prefab = new prefab(0, 0, "\
BBrBGG....,\
GGGGG...sG,\
GGGGG.G.GG,\
");

// - - - - - - - - -
const urlparams = new URLSearchParams(window.location.search);
if(urlparams.get("prefabtest") != null) prefab_testing = new prefab(0, 0, urlparams.get("prefabtest"));
function draw_sprite_text(x,y,text) { 
for (i = 0; i < text.length+1; i += 1) {
	if(text.charCodeAt(i)-32 > 0) draw_sprite(s_font, text.charCodeAt(i)-32, x+i*8, y);
}
}
function prefab_newent(bx, by, ent, arg=null) { 
let e = instance_create(bx*16, by*16, ent);
e.arg = arg;
}
function ccheck() { 
this.chc = keyboard_string.toLowerCase();

// debug
if(this.chc.endsWith("dbg")) { keyboard_string =  ""; debug = !debug  }
if(this.chc.endsWith("cls")) keyboard_string = "";
if(this.chc.endsWith("res")) { keyboard_string = ""; room_goto(room_current); }

// characters
if(this.chc.endsWith("strawberrymilk")) change_costume("sak1");
if(this.chc.endsWith("strawberrymilj")) change_costume("sak2");
if(this.chc.endsWith("fatman")) change_costume("fat");
if(this.chc.endsWith("bigguy")) change_costume("tall");
if(this.chc.endsWith("oswald")) change_costume("default");
if(this.chc.endsWith("imissmywife")) change_costume("girl");
if(this.chc.endsWith("howdy")) change_costume("hat");
if(this.chc.endsWith("weeder")) change_costume("soup");
if(this.chc.endsWith("agent")) change_costume("agent");
if(this.chc.endsWith("chinesebbq")) { keyboard_string = ""; sound_play(snd_bong); change_costume("burnt") };
if(this.chc.endsWith("troll")) { keyboard_string = ""; sound_play(snd_bigheadhit); change_costume("troll") };
}
function highscore_update() { 
save_web_integer("la", last_score);
if(last_score > high_score) { 
	high_score = last_score;
	save_web_integer("hi", high_score);
}
}
function change_costume(costume) { 
if(costume in player_costumes) {
	player_character = player_costumes[costume];
	save_web_string("costume", costume);
	return true;
}
return false;
}
function input_pressed(k1=-1, k2=-1, k3=-1) { 
return key_pressed[k1] || key_pressed[k2] || key_pressed[k3];
}
function input_released(k1=-1, k2=-1, k3=-1) { 
return key_released[k1] || key_released[k2] || key_released[k3];
}
function input_down(k1=-1, k2=-1, k3=-1) { 
return key_down[k1] || key_down[k2] || key_down[k3];
}
function input_down_int(k1=-1, k2=-1, k3=-1) { 
if(key_down[k1] || key_down[k2] || key_down[k3]) return 1;
return 0;
}
function sound_c_play(sound) { 
if(sound_enabled) sound_play(sound);
}
function spawn_corpse(x=0, y=0, sprite=s_cat_burnt, dir=1, vx=0, vy=-12) { 
let corpse = instance_create(x, y, o_corpse);
corpse.sprite_index = sprite;
corpse.sprite_dir = dir;
corpse.vx = vx;
corpse.vy = vy;
return corpse;
}
function autotile(me, bls, tileset, col) { 
me.image_speed = 0;
me.image_index = 0;

me.hor = 0;
me.ver = 0;

if(me.y == 0) instance_create(me.x, me.y-bls, me.object_index);
if(me.y == room_height-bls) instance_create(me.x, me.y+bls, me.object_index);

if(me.place_meeting(me.x+bls, me.y, me.object_index)){me.hor = 1}
if(me.place_meeting(me.x-bls, me.y, me.object_index))
{
    if(me.hor == 1){me.hor = 2}
    else{me.hor = 3}
}

if(me.place_meeting(me.x, me.y+bls, me.object_index)){me.ver = 1}
if(me.place_meeting(me.x, me.y-bls, me.object_index))
{
    if(me.ver == 1){me.ver = 2}
    else{me.ver = 3}
}

me.image_index = 4*me.ver + me.hor;
tile_add(tileset, me.image_index*bls, 0, bls, bls, me.x, me.y, 1);
if(!(me.y + 16 >= room_height && me.image_index == 14)) {
	if(me.image_index != 10) instance_create(me.x, me.y, col);
}
}
function random_int(minn=0, maxn=1) { 
return Math.round(Math.random() * (maxn - minn) + minn);
}
function marker(xn, yn, txt="") { 
if(!debug) return;
let mark = instance_create(xn, yn, o_debug_marker);
mark.text = txt;
}


tu_gameloop = tu_loop;
tu_loop();
