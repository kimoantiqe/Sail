import click
import json
from cli import pass_context


@click.command('init', short_help='Initializes a sail project')
@click.argument('project_name', required=False, type=str)
@pass_context
def cli(ctx, project_name):
    """Initializes a sail project"""

    #Build condfig file
    configfile={}
    click.echo('This utility will walk you through creating a configurations file sail.json for Sail.\n')

    #Check if vps name was provided as arg
    if project_name is None:
        configfile['vps_name'] = click.prompt('Give your vps a name', type=str)
    else:
        configfile['vps_name'] = project_name

    #prompt for a description
    configfile['vps_description'] = click.prompt('Give your vps a small description', type=str)
    with open('sail.json', 'w') as outfile:
        json.dump(configfile,outfile,indent=4)  
        
    ctx.log('Succesfully intiallized config file') 