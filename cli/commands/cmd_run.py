import click
from cli import pass_context


@click.command('run', short_help='Runs sail project')
@pass_context
def cli(ctx):
    """Runs sail project"""
    #TODO