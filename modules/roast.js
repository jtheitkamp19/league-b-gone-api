var SQLiteUtil = require( './SQLiteUtil.js' );

function Roast( dataObject ) {
	var self = {};
	
	var KEY_ID = "id";
	var KEY_ROAST = "roast";
	var KEY_CREATOR = "creator";
	
	var TABLE_NAME = "roast";
	var COLUMN_NAMES = "( id, 'roast_value', 'creator' )";
	
	var INSERT_STATEMENT = `INSERT OR REPLACE INTO ${TABLE_NAME} VALUES ${COLUMN_NAMES}`;
	
	self[ KEY_ID ] = ( !!dataObject && _.isNumber( dataObject.id ) ) ? dataObject.id : null;
	
	self[ KEY_ROAST ] = ( !!dataObject && _.isString( dataObject.roast ) ) ? dataObject.roast : null;
	
	self[ KEY_CREATOR ] = ( !!dataObject && _.isString( dataObject.creator ) ) ? dataObject.creator : null;
	
	self.getId = function() {
		return self[ KEY_ID ];
	};
	self.getRoast = function() {
		return self[ KEY_ROAST ];
	};
	self.getCreator = function() {
		return self[ KEY_CREATOR ];
	};
	
	self.getSQLInsertionString = function() {
		return INSERT_STATEMENT
			.replace( 'id', self.getId() )
			.replace( 'roast_value', SQLiteUtil.getEscapedStringForSQL( self.getRoast() ) )
			.replace( 'creator', SQLiteUtil.getEscapedStringForSQL( self.getCreator() ) );
	};
	
	return self;
}

module.exports = Roast;
	
