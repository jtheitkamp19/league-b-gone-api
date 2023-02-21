var _ = require( 'underscore' );
var SQLiteUtil = require( './SQLiteUtil.js' );

function Support( dataObject ) {
	var self = {};
	
	var KEY_ID = "id";
	var KEY_SUPPORT = "support";
	var KEY_CREATOR = 'creator';
	
	var TABLE_NAME = "support";
	var COLUMN_NAMES = "( id, 'support_value', 'creator' )";
	
	var INSERT_STATEMENT = `INSERT OR REPLACE INTO ${TABLE_NAME} VALUES ${COLUMN_NAMES}`;
	
	self[ KEY_ID ] = ( !!dataObject && _.isNumber( dataObject.id ) ) ? dataObject.id : null;
	
	self[ KEY_SUPPORT ] = ( !!dataObject && _.isString( dataObject.support ) ) ? dataObject.support : null;
	
	self[ KEY_CREATOR ] = ( !!dataObject && _.isString( dataObject.creator ) ) ? dataObject.creator : null;
	
	self.getId = function() {
		return self[ KEY_ID ];
	};
	self.getSupport = function() {
		return self[ KEY_SUPPORT ];
	};
	self.getCreator = function() {
		return self[ KEY_CREATOR ];
	};
	
	self.getSQLInsertionString = function() {
		return INSERT_STATEMENT
			.replace( 'id', self.getId() )
			.replace( 'support_value', SQLiteUtil.getEscapedStringForSQL( self.getSupport() ) )
			.replace( 'creator', SQLiteUtil.getEscapedStringForSQL( self.getCreator() ) );
	};
	
	return self;
}

module.exports = Support;
	
