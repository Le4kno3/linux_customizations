// This file is generated by "./lib/proto/generate"

package proto

/*

Input

*/

// InputTouchPoint ...
type InputTouchPoint struct {

	// X X coordinate of the event relative to the main frame's viewport in CSS pixels.
	X float64 `json:"x"`

	// Y Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
	// the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
	Y float64 `json:"y"`

	// RadiusX (optional) X radius of the touch area (default: 1.0).
	RadiusX float64 `json:"radiusX,omitempty"`

	// RadiusY (optional) Y radius of the touch area (default: 1.0).
	RadiusY float64 `json:"radiusY,omitempty"`

	// RotationAngle (optional) Rotation angle (default: 0.0).
	RotationAngle float64 `json:"rotationAngle,omitempty"`

	// Force (optional) Force (default: 1.0).
	Force float64 `json:"force,omitempty"`

	// TangentialPressure (experimental) (optional) The normalized tangential pressure, which has a range of [-1,1] (default: 0).
	TangentialPressure float64 `json:"tangentialPressure,omitempty"`

	// TiltX (experimental) (optional) The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0)
	TiltX int `json:"tiltX,omitempty"`

	// TiltY (experimental) (optional) The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
	TiltY int `json:"tiltY,omitempty"`

	// Twist (experimental) (optional) The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
	Twist int `json:"twist,omitempty"`

	// ID (optional) Identifier used to track touch sources between events, must be unique within an event.
	ID float64 `json:"id,omitempty"`
}

// InputGestureSourceType (experimental) ...
type InputGestureSourceType string

const (
	// InputGestureSourceTypeDefault enum const
	InputGestureSourceTypeDefault InputGestureSourceType = "default"

	// InputGestureSourceTypeTouch enum const
	InputGestureSourceTypeTouch InputGestureSourceType = "touch"

	// InputGestureSourceTypeMouse enum const
	InputGestureSourceTypeMouse InputGestureSourceType = "mouse"
)

// InputMouseButton ...
type InputMouseButton string

const (
	// InputMouseButtonNone enum const
	InputMouseButtonNone InputMouseButton = "none"

	// InputMouseButtonLeft enum const
	InputMouseButtonLeft InputMouseButton = "left"

	// InputMouseButtonMiddle enum const
	InputMouseButtonMiddle InputMouseButton = "middle"

	// InputMouseButtonRight enum const
	InputMouseButtonRight InputMouseButton = "right"

	// InputMouseButtonBack enum const
	InputMouseButtonBack InputMouseButton = "back"

	// InputMouseButtonForward enum const
	InputMouseButtonForward InputMouseButton = "forward"
)

// InputDragDataItem (experimental) ...
type InputDragDataItem struct {

	// MIMEType Mime type of the dragged data.
	MIMEType string `json:"mimeType"`

	// Data Depending of the value of `mimeType`, it contains the dragged link,
	// text, HTML markup or any other data.
	Data string `json:"data"`

	// Title (optional) Title associated with a link. Only valid when `mimeType` == "text/uri-list".
	Title string `json:"title,omitempty"`

	// BaseURL (optional) Stores the base URL for the contained markup. Only valid when `mimeType`
	// == "text/html".
	BaseURL string `json:"baseURL,omitempty"`
}

// InputDragData (experimental) ...
type InputDragData struct {

	// Items ...
	Items []*InputDragDataItem `json:"items"`

	// Files (optional) List of filenames that should be included when dropping
	Files []string `json:"files,omitempty"`

	// DragOperationsMask Bit field representing allowed drag operations. Copy = 1, Link = 2, Move = 16
	DragOperationsMask int `json:"dragOperationsMask"`
}

// InputDispatchDragEventType enum
type InputDispatchDragEventType string

const (
	// InputDispatchDragEventTypeDragEnter enum const
	InputDispatchDragEventTypeDragEnter InputDispatchDragEventType = "dragEnter"

	// InputDispatchDragEventTypeDragOver enum const
	InputDispatchDragEventTypeDragOver InputDispatchDragEventType = "dragOver"

	// InputDispatchDragEventTypeDrop enum const
	InputDispatchDragEventTypeDrop InputDispatchDragEventType = "drop"

	// InputDispatchDragEventTypeDragCancel enum const
	InputDispatchDragEventTypeDragCancel InputDispatchDragEventType = "dragCancel"
)

// InputDispatchDragEvent (experimental) Dispatches a drag event into the page.
type InputDispatchDragEvent struct {

	// Type Type of the drag event.
	Type InputDispatchDragEventType `json:"type"`

	// X X coordinate of the event relative to the main frame's viewport in CSS pixels.
	X float64 `json:"x"`

	// Y Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
	// the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
	Y float64 `json:"y"`

	// Data ...
	Data *InputDragData `json:"data"`

	// Modifiers (optional) Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
	// (default: 0).
	Modifiers int `json:"modifiers,omitempty"`
}

// ProtoReq name
func (m InputDispatchDragEvent) ProtoReq() string { return "Input.dispatchDragEvent" }

// Call sends the request
func (m InputDispatchDragEvent) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputDispatchKeyEventType enum
type InputDispatchKeyEventType string

const (
	// InputDispatchKeyEventTypeKeyDown enum const
	InputDispatchKeyEventTypeKeyDown InputDispatchKeyEventType = "keyDown"

	// InputDispatchKeyEventTypeKeyUp enum const
	InputDispatchKeyEventTypeKeyUp InputDispatchKeyEventType = "keyUp"

	// InputDispatchKeyEventTypeRawKeyDown enum const
	InputDispatchKeyEventTypeRawKeyDown InputDispatchKeyEventType = "rawKeyDown"

	// InputDispatchKeyEventTypeChar enum const
	InputDispatchKeyEventTypeChar InputDispatchKeyEventType = "char"
)

// InputDispatchKeyEvent Dispatches a key event to the page.
type InputDispatchKeyEvent struct {

	// Type Type of the key event.
	Type InputDispatchKeyEventType `json:"type"`

	// Modifiers (optional) Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
	// (default: 0).
	Modifiers int `json:"modifiers,omitempty"`

	// Timestamp (optional) Time at which the event occurred.
	Timestamp TimeSinceEpoch `json:"timestamp,omitempty"`

	// Text (optional) Text as generated by processing a virtual key code with a keyboard layout. Not needed for
	// for `keyUp` and `rawKeyDown` events (default: "")
	Text string `json:"text,omitempty"`

	// UnmodifiedText (optional) Text that would have been generated by the keyboard if no modifiers were pressed (except for
	// shift). Useful for shortcut (accelerator) key handling (default: "").
	UnmodifiedText string `json:"unmodifiedText,omitempty"`

	// KeyIdentifier (optional) Unique key identifier (e.g., 'U+0041') (default: "").
	KeyIdentifier string `json:"keyIdentifier,omitempty"`

	// Code (optional) Unique DOM defined string value for each physical key (e.g., 'KeyA') (default: "").
	Code string `json:"code,omitempty"`

	// Key (optional) Unique DOM defined string value describing the meaning of the key in the context of active
	// modifiers, keyboard layout, etc (e.g., 'AltGr') (default: "").
	Key string `json:"key,omitempty"`

	// WindowsVirtualKeyCode (optional) Windows virtual key code (default: 0).
	WindowsVirtualKeyCode int `json:"windowsVirtualKeyCode,omitempty"`

	// NativeVirtualKeyCode (optional) Native virtual key code (default: 0).
	NativeVirtualKeyCode int `json:"nativeVirtualKeyCode,omitempty"`

	// AutoRepeat (optional) Whether the event was generated from auto repeat (default: false).
	AutoRepeat bool `json:"autoRepeat,omitempty"`

	// IsKeypad (optional) Whether the event was generated from the keypad (default: false).
	IsKeypad bool `json:"isKeypad,omitempty"`

	// IsSystemKey (optional) Whether the event was a system key event (default: false).
	IsSystemKey bool `json:"isSystemKey,omitempty"`

	// Location (optional) Whether the event was from the left or right side of the keyboard. 1=Left, 2=Right (default:
	// 0).
	Location int `json:"location,omitempty"`

	// Commands (experimental) (optional) Editing commands to send with the key event (e.g., 'selectAll') (default: []).
	// These are related to but not equal the command names used in `document.execCommand` and NSStandardKeyBindingResponding.
	// See https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h for valid command names.
	Commands []string `json:"commands,omitempty"`
}

// ProtoReq name
func (m InputDispatchKeyEvent) ProtoReq() string { return "Input.dispatchKeyEvent" }

// Call sends the request
func (m InputDispatchKeyEvent) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputInsertText (experimental) This method emulates inserting text that doesn't come from a key press,
// for example an emoji keyboard or an IME.
type InputInsertText struct {

	// Text The text to insert.
	Text string `json:"text"`
}

// ProtoReq name
func (m InputInsertText) ProtoReq() string { return "Input.insertText" }

// Call sends the request
func (m InputInsertText) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputImeSetComposition (experimental) This method sets the current candidate text for ime.
// Use imeCommitComposition to commit the final text.
// Use imeSetComposition with empty string as text to cancel composition.
type InputImeSetComposition struct {

	// Text The text to insert
	Text string `json:"text"`

	// SelectionStart selection start
	SelectionStart int `json:"selectionStart"`

	// SelectionEnd selection end
	SelectionEnd int `json:"selectionEnd"`

	// ReplacementStart (optional) replacement start
	ReplacementStart int `json:"replacementStart,omitempty"`

	// ReplacementEnd (optional) replacement end
	ReplacementEnd int `json:"replacementEnd,omitempty"`
}

// ProtoReq name
func (m InputImeSetComposition) ProtoReq() string { return "Input.imeSetComposition" }

// Call sends the request
func (m InputImeSetComposition) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputDispatchMouseEventType enum
type InputDispatchMouseEventType string

const (
	// InputDispatchMouseEventTypeMousePressed enum const
	InputDispatchMouseEventTypeMousePressed InputDispatchMouseEventType = "mousePressed"

	// InputDispatchMouseEventTypeMouseReleased enum const
	InputDispatchMouseEventTypeMouseReleased InputDispatchMouseEventType = "mouseReleased"

	// InputDispatchMouseEventTypeMouseMoved enum const
	InputDispatchMouseEventTypeMouseMoved InputDispatchMouseEventType = "mouseMoved"

	// InputDispatchMouseEventTypeMouseWheel enum const
	InputDispatchMouseEventTypeMouseWheel InputDispatchMouseEventType = "mouseWheel"
)

// InputDispatchMouseEventPointerType enum
type InputDispatchMouseEventPointerType string

const (
	// InputDispatchMouseEventPointerTypeMouse enum const
	InputDispatchMouseEventPointerTypeMouse InputDispatchMouseEventPointerType = "mouse"

	// InputDispatchMouseEventPointerTypePen enum const
	InputDispatchMouseEventPointerTypePen InputDispatchMouseEventPointerType = "pen"
)

// InputDispatchMouseEvent Dispatches a mouse event to the page.
type InputDispatchMouseEvent struct {

	// Type Type of the mouse event.
	Type InputDispatchMouseEventType `json:"type"`

	// X X coordinate of the event relative to the main frame's viewport in CSS pixels.
	X float64 `json:"x"`

	// Y Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
	// the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
	Y float64 `json:"y"`

	// Modifiers (optional) Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
	// (default: 0).
	Modifiers int `json:"modifiers,omitempty"`

	// Timestamp (optional) Time at which the event occurred.
	Timestamp TimeSinceEpoch `json:"timestamp,omitempty"`

	// Button (optional) Mouse button (default: "none").
	Button InputMouseButton `json:"button,omitempty"`

	// Buttons (optional) A number indicating which buttons are pressed on the mouse when a mouse event is triggered.
	// Left=1, Right=2, Middle=4, Back=8, Forward=16, None=0.
	Buttons int `json:"buttons,omitempty"`

	// ClickCount (optional) Number of times the mouse button was clicked (default: 0).
	ClickCount int `json:"clickCount,omitempty"`

	// Force (experimental) (optional) The normalized pressure, which has a range of [0,1] (default: 0).
	Force float64 `json:"force,omitempty"`

	// TangentialPressure (experimental) (optional) The normalized tangential pressure, which has a range of [-1,1] (default: 0).
	TangentialPressure float64 `json:"tangentialPressure,omitempty"`

	// TiltX (experimental) (optional) The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0).
	TiltX int `json:"tiltX,omitempty"`

	// TiltY (experimental) (optional) The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
	TiltY int `json:"tiltY,omitempty"`

	// Twist (experimental) (optional) The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
	Twist int `json:"twist,omitempty"`

	// DeltaX (optional) X delta in CSS pixels for mouse wheel event (default: 0).
	DeltaX float64 `json:"deltaX,omitempty"`

	// DeltaY (optional) Y delta in CSS pixels for mouse wheel event (default: 0).
	DeltaY float64 `json:"deltaY,omitempty"`

	// PointerType (optional) Pointer type (default: "mouse").
	PointerType InputDispatchMouseEventPointerType `json:"pointerType,omitempty"`
}

// ProtoReq name
func (m InputDispatchMouseEvent) ProtoReq() string { return "Input.dispatchMouseEvent" }

// Call sends the request
func (m InputDispatchMouseEvent) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputDispatchTouchEventType enum
type InputDispatchTouchEventType string

const (
	// InputDispatchTouchEventTypeTouchStart enum const
	InputDispatchTouchEventTypeTouchStart InputDispatchTouchEventType = "touchStart"

	// InputDispatchTouchEventTypeTouchEnd enum const
	InputDispatchTouchEventTypeTouchEnd InputDispatchTouchEventType = "touchEnd"

	// InputDispatchTouchEventTypeTouchMove enum const
	InputDispatchTouchEventTypeTouchMove InputDispatchTouchEventType = "touchMove"

	// InputDispatchTouchEventTypeTouchCancel enum const
	InputDispatchTouchEventTypeTouchCancel InputDispatchTouchEventType = "touchCancel"
)

// InputDispatchTouchEvent Dispatches a touch event to the page.
type InputDispatchTouchEvent struct {

	// Type Type of the touch event. TouchEnd and TouchCancel must not contain any touch points, while
	// TouchStart and TouchMove must contains at least one.
	Type InputDispatchTouchEventType `json:"type"`

	// TouchPoints Active touch points on the touch device. One event per any changed point (compared to
	// previous touch event in a sequence) is generated, emulating pressing/moving/releasing points
	// one by one.
	TouchPoints []*InputTouchPoint `json:"touchPoints"`

	// Modifiers (optional) Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
	// (default: 0).
	Modifiers int `json:"modifiers,omitempty"`

	// Timestamp (optional) Time at which the event occurred.
	Timestamp TimeSinceEpoch `json:"timestamp,omitempty"`
}

// ProtoReq name
func (m InputDispatchTouchEvent) ProtoReq() string { return "Input.dispatchTouchEvent" }

// Call sends the request
func (m InputDispatchTouchEvent) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputEmulateTouchFromMouseEventType enum
type InputEmulateTouchFromMouseEventType string

const (
	// InputEmulateTouchFromMouseEventTypeMousePressed enum const
	InputEmulateTouchFromMouseEventTypeMousePressed InputEmulateTouchFromMouseEventType = "mousePressed"

	// InputEmulateTouchFromMouseEventTypeMouseReleased enum const
	InputEmulateTouchFromMouseEventTypeMouseReleased InputEmulateTouchFromMouseEventType = "mouseReleased"

	// InputEmulateTouchFromMouseEventTypeMouseMoved enum const
	InputEmulateTouchFromMouseEventTypeMouseMoved InputEmulateTouchFromMouseEventType = "mouseMoved"

	// InputEmulateTouchFromMouseEventTypeMouseWheel enum const
	InputEmulateTouchFromMouseEventTypeMouseWheel InputEmulateTouchFromMouseEventType = "mouseWheel"
)

// InputEmulateTouchFromMouseEvent (experimental) Emulates touch event from the mouse event parameters.
type InputEmulateTouchFromMouseEvent struct {

	// Type Type of the mouse event.
	Type InputEmulateTouchFromMouseEventType `json:"type"`

	// X X coordinate of the mouse pointer in DIP.
	X int `json:"x"`

	// Y Y coordinate of the mouse pointer in DIP.
	Y int `json:"y"`

	// Button Mouse button. Only "none", "left", "right" are supported.
	Button InputMouseButton `json:"button"`

	// Timestamp (optional) Time at which the event occurred (default: current time).
	Timestamp TimeSinceEpoch `json:"timestamp,omitempty"`

	// DeltaX (optional) X delta in DIP for mouse wheel event (default: 0).
	DeltaX float64 `json:"deltaX,omitempty"`

	// DeltaY (optional) Y delta in DIP for mouse wheel event (default: 0).
	DeltaY float64 `json:"deltaY,omitempty"`

	// Modifiers (optional) Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
	// (default: 0).
	Modifiers int `json:"modifiers,omitempty"`

	// ClickCount (optional) Number of times the mouse button was clicked (default: 0).
	ClickCount int `json:"clickCount,omitempty"`
}

// ProtoReq name
func (m InputEmulateTouchFromMouseEvent) ProtoReq() string { return "Input.emulateTouchFromMouseEvent" }

// Call sends the request
func (m InputEmulateTouchFromMouseEvent) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputSetIgnoreInputEvents Ignores input events (useful while auditing page).
type InputSetIgnoreInputEvents struct {

	// Ignore Ignores input events processing when set to true.
	Ignore bool `json:"ignore"`
}

// ProtoReq name
func (m InputSetIgnoreInputEvents) ProtoReq() string { return "Input.setIgnoreInputEvents" }

// Call sends the request
func (m InputSetIgnoreInputEvents) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputSetInterceptDrags (experimental) Prevents default drag and drop behavior and instead emits `Input.dragIntercepted` events.
// Drag and drop behavior can be directly controlled via `Input.dispatchDragEvent`.
type InputSetInterceptDrags struct {

	// Enabled ...
	Enabled bool `json:"enabled"`
}

// ProtoReq name
func (m InputSetInterceptDrags) ProtoReq() string { return "Input.setInterceptDrags" }

// Call sends the request
func (m InputSetInterceptDrags) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputSynthesizePinchGesture (experimental) Synthesizes a pinch gesture over a time period by issuing appropriate touch events.
type InputSynthesizePinchGesture struct {

	// X X coordinate of the start of the gesture in CSS pixels.
	X float64 `json:"x"`

	// Y Y coordinate of the start of the gesture in CSS pixels.
	Y float64 `json:"y"`

	// ScaleFactor Relative scale factor after zooming (>1.0 zooms in, <1.0 zooms out).
	ScaleFactor float64 `json:"scaleFactor"`

	// RelativeSpeed (optional) Relative pointer speed in pixels per second (default: 800).
	RelativeSpeed int `json:"relativeSpeed,omitempty"`

	// GestureSourceType (optional) Which type of input events to be generated (default: 'default', which queries the platform
	// for the preferred input type).
	GestureSourceType InputGestureSourceType `json:"gestureSourceType,omitempty"`
}

// ProtoReq name
func (m InputSynthesizePinchGesture) ProtoReq() string { return "Input.synthesizePinchGesture" }

// Call sends the request
func (m InputSynthesizePinchGesture) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputSynthesizeScrollGesture (experimental) Synthesizes a scroll gesture over a time period by issuing appropriate touch events.
type InputSynthesizeScrollGesture struct {

	// X X coordinate of the start of the gesture in CSS pixels.
	X float64 `json:"x"`

	// Y Y coordinate of the start of the gesture in CSS pixels.
	Y float64 `json:"y"`

	// XDistance (optional) The distance to scroll along the X axis (positive to scroll left).
	XDistance float64 `json:"xDistance,omitempty"`

	// YDistance (optional) The distance to scroll along the Y axis (positive to scroll up).
	YDistance float64 `json:"yDistance,omitempty"`

	// XOverscroll (optional) The number of additional pixels to scroll back along the X axis, in addition to the given
	// distance.
	XOverscroll float64 `json:"xOverscroll,omitempty"`

	// YOverscroll (optional) The number of additional pixels to scroll back along the Y axis, in addition to the given
	// distance.
	YOverscroll float64 `json:"yOverscroll,omitempty"`

	// PreventFling (optional) Prevent fling (default: true).
	PreventFling bool `json:"preventFling,omitempty"`

	// Speed (optional) Swipe speed in pixels per second (default: 800).
	Speed int `json:"speed,omitempty"`

	// GestureSourceType (optional) Which type of input events to be generated (default: 'default', which queries the platform
	// for the preferred input type).
	GestureSourceType InputGestureSourceType `json:"gestureSourceType,omitempty"`

	// RepeatCount (optional) The number of times to repeat the gesture (default: 0).
	RepeatCount int `json:"repeatCount,omitempty"`

	// RepeatDelayMs (optional) The number of milliseconds delay between each repeat. (default: 250).
	RepeatDelayMs int `json:"repeatDelayMs,omitempty"`

	// InteractionMarkerName (optional) The name of the interaction markers to generate, if not empty (default: "").
	InteractionMarkerName string `json:"interactionMarkerName,omitempty"`
}

// ProtoReq name
func (m InputSynthesizeScrollGesture) ProtoReq() string { return "Input.synthesizeScrollGesture" }

// Call sends the request
func (m InputSynthesizeScrollGesture) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputSynthesizeTapGesture (experimental) Synthesizes a tap gesture over a time period by issuing appropriate touch events.
type InputSynthesizeTapGesture struct {

	// X X coordinate of the start of the gesture in CSS pixels.
	X float64 `json:"x"`

	// Y Y coordinate of the start of the gesture in CSS pixels.
	Y float64 `json:"y"`

	// Duration (optional) Duration between touchdown and touchup events in ms (default: 50).
	Duration int `json:"duration,omitempty"`

	// TapCount (optional) Number of times to perform the tap (e.g. 2 for double tap, default: 1).
	TapCount int `json:"tapCount,omitempty"`

	// GestureSourceType (optional) Which type of input events to be generated (default: 'default', which queries the platform
	// for the preferred input type).
	GestureSourceType InputGestureSourceType `json:"gestureSourceType,omitempty"`
}

// ProtoReq name
func (m InputSynthesizeTapGesture) ProtoReq() string { return "Input.synthesizeTapGesture" }

// Call sends the request
func (m InputSynthesizeTapGesture) Call(c Client) error {
	return call(m.ProtoReq(), m, nil, c)
}

// InputDragIntercepted (experimental) Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
// restore normal drag and drop behavior.
type InputDragIntercepted struct {

	// Data ...
	Data *InputDragData `json:"data"`
}

// ProtoEvent name
func (evt InputDragIntercepted) ProtoEvent() string {
	return "Input.dragIntercepted"
}
