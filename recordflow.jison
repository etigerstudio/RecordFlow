//* description: Parses RecordFlow Statements. */

/* manipulation functions */
%{


%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[a-zA-Z]([a-zA-Z0-9])*    return 'IDENTIFIER'
[0-9]+("."[0-9]+)?        return 'NUMBER'
\'([a-zA-Z0-9])*\'          return 'STRING'
"->"                        return 'RARROW'
"<-"                        return 'LARROW'
":"                         return ':'
"{"                         return '{'
"}"                         return '}'
"="                         return '='
">"                         return '>'
"<"                         return '<'
<<EOF>>                     return 'EOF'

/lex

/* operator associations and precedence */

%left RARROW
%left LARROW

%start input

%% /* language grammar */

input
    : exps EOF
    ;

exps
    : exp
    | exps exp
    ;

exp
    : exp_insert
    | exp_update
    ;

exp_insert
    : collection_entity LARROW record_entity
    ;

exp_update
    : record_map LARROW record_entity
    ;

record_entity
    : '{' record_item '}'
    ;

record_item
    : record_item_name ':' record_item_value
    ;

record_item_name
    : IDENTIFIER
    ;

record_item_value
    : record_item_value_string
    | record_item_value_number
    ;

record_item_value_string
    : STRING
    ;

record_item_value_number
    : NUMBER
    ;

record_map
    : collection_entity RARROW record_filter_entity
    ;

record_filter_entity
    : '{' record_filter '}'
    ;

record_filter
    : record_filter_equal
    | record_filter_gt
    | record_filter_lt
    ;

record_filter_equal
    : record_item_name '=' record_item_value
    ;

record_filter_gt
    : record_item_name '>' record_item_value_number
    ;

record_filter_lt
    : record_item_name '<' record_item_value_number
    ;

record_filter_operator_binary
    : '='
    | '>'
    | '<'
    ;

collection_entity
    : IDENTIFIER
    ;

