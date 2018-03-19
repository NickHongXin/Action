export const API_ACCOUNT_API_PATH = '/api/account';

export const PAGE_SIZE = 5;

export const EMPTY_STRING = '';

export const BTN_BG_COLOR = 'btn_background_color';

export const LEFT_LINK_DISABLE = 'link_left_disable';

export const RIGHT_LINK_DISABLE = 'link_right_disable';

export const TEXTLINK_DISABLE = 'textlink_disable';

export const DEFAULT_PASSWORD = '123456';

export const HTTP_STATUS_CODE_UNAUTHORIZED = 401;

export const HOSPITAL_ACCOUNT_API_PATH = '/api/hospitalAccount';

export const EMPTY_HOSPITAL_ACCOUNT = {
	hospitalName: EMPTY_STRING,
	hospitalId: 0,
	hospitalCode: EMPTY_STRING,
	localityCode: EMPTY_STRING,
	displayName: EMPTY_STRING,
	mailAddress: EMPTY_STRING,
	password: DEFAULT_PASSWORD,
	hospitalUserId: 0,
	hospitalUserPermissions: []
};

export const LOCALITY_ACCOUNT_API_PATH = '/api/localityAccount';

export const EMPTY_LOCALITY_ACCOUNT = {
	localityName: EMPTY_STRING,
	localityId: 0,
	localityCode: EMPTY_STRING,
	loginUserId: EMPTY_STRING,
	password: DEFAULT_PASSWORD,
	displayName: EMPTY_STRING,
	localityUserId: 0,
	localityUserPermissions: []
};